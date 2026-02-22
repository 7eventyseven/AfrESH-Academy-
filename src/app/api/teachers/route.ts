import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Teacher from '@/models/Teacher';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const teachers = await Teacher.find({}).sort({ createdAt: -1 });
        return NextResponse.json(teachers);
    } catch (error) {
        console.error('Teachers fetch error:', error);
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
        const data = await request.json();
        const teacher = await Teacher.create(data);
        return NextResponse.json(teacher, { status: 201 });
    } catch (error: any) {
        console.error('Teacher creation error:', error);
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
