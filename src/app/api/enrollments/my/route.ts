import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Enrollment from '@/models/Enrollment';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const authUser = await requireAuth(request);
        await connectDB();

        const enrollments = await Enrollment.find({ student: authUser.userId })
            .populate('course');

        return NextResponse.json(enrollments);
    } catch (error: any) {
        const status = error?.message === 'Unauthorized' ? 401 : 500;
        const message =
            error?.message === 'Unauthorized'
                ? 'Unauthorized'
                : 'Internal server error';
        return NextResponse.json({ message }, { status });
    }
}
