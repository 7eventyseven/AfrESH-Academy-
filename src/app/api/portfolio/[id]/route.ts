import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import { requireAdmin } from '@/lib/auth';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin(request);
        await connectDB();

        const { id } = await params;
        const data = await request.json();

        const portfolioItem = await Portfolio.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        if (!portfolioItem) {
            return NextResponse.json(
                { message: 'Portfolio item not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(portfolioItem);
    } catch (error: any) {
        console.error('Portfolio update error:', error);
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

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin(request);
        await connectDB();

        const { id } = await params;
        const portfolioItem = await Portfolio.findByIdAndDelete(id);

        if (!portfolioItem) {
            return NextResponse.json(
                { message: 'Portfolio item not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Portfolio item deleted successfully' });
    } catch (error: any) {
        console.error('Portfolio delete error:', error);
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
