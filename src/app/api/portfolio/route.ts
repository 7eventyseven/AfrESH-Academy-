import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
    if (!process.env.MONGODB_URI) {
        return NextResponse.json([]);
    }
    try {
        await connectDB();
        const portfolio = await Portfolio.find({}).sort({ createdAt: -1 });
        return NextResponse.json(portfolio);
    } catch (error: unknown) {
        console.error('Portfolio fetch error:', error);
        return NextResponse.json([]);
    }
}

export async function POST(request: NextRequest) {
    try {
        await requireAdmin(request);
        await connectDB();
        const data = await request.json();
        const portfolioItem = await Portfolio.create(data);
        return NextResponse.json(portfolioItem, { status: 201 });
    } catch (error: any) {
        console.error('Portfolio creation error:', error);
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
