import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        await requireAdmin(request);
        await connectDB();

        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        return NextResponse.json(users);
    } catch (error: any) {
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
