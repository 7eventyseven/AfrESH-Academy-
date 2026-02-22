import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser, requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        // Since we only have one settings document, we findOne
        let settings = await Settings.findOne();

        if (!settings) {
            // Create default if not exists
            settings = await Settings.create({});
        }

        const authUser = await getAuthUser(request);

        if (authUser?.role === 'admin') {
            return NextResponse.json(settings);
        }

        return NextResponse.json({
            paystackPublicKey: settings.paystackPublicKey || '',
        });
    } catch (error) {
        console.error('Settings fetch error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await requireAdmin(request);
        await connectDB();
        const body = await request.json();
        const { paystackPublicKey, paystackSecretKey } = body;

        let settings = await Settings.findOne();

        if (settings) {
            settings.paystackPublicKey = paystackPublicKey;
            settings.paystackSecretKey = paystackSecretKey;
            await settings.save();
        } else {
            settings = await Settings.create({
                paystackPublicKey,
                paystackSecretKey
            });
        }

        return NextResponse.json(settings);
    } catch (error: any) {
        console.error('Settings save error:', error);
        const status =
            error?.message === 'Unauthorized'
                ? 401
                : error?.message === 'Forbidden'
                ? 403
                : 500;
        const message =
            error?.message === 'Unauthorized'
                ? 'Unauthorized'
                : error?.message === 'Forbidden'
                ? 'Forbidden'
                : 'Internal server error';
        return NextResponse.json({ message }, { status });
    }
}
