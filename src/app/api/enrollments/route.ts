import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Enrollment from '@/models/Enrollment';
import Course from '@/models/Course';
import { requireAdmin, requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        await requireAdmin(request);
        await connectDB();

        const enrollments = await Enrollment.find({})
            .populate('student', 'name email')
            .populate('course');

        return NextResponse.json(enrollments);
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

export async function POST(request: NextRequest) {
    try {
        const authUser = await requireAuth(request);
        const { courseId, paymentStatus } = await request.json();

        if (!courseId) {
            return NextResponse.json(
                { message: 'courseId is required' },
                { status: 400 }
            );
        }

        await connectDB();

        const course = await Course.findById(courseId);
        if (!course) {
            return NextResponse.json(
                { message: 'Course not found' },
                { status: 404 }
            );
        }

        const existing = await Enrollment.findOne({
            student: authUser.userId,
            course: courseId,
        }).populate('course');

        if (existing) {
            return NextResponse.json(existing);
        }

        const enrollment = await Enrollment.create({
            student: authUser.userId,
            course: courseId,
            paymentStatus: paymentStatus || 'completed',
            progress: 0,
            completedLessons: [],
        });

        await Course.findByIdAndUpdate(courseId, { $inc: { students: 1 } });

        const populated = await Enrollment.findById(enrollment._id).populate('course');
        return NextResponse.json(populated, { status: 201 });
    } catch (error: any) {
        const status = error?.message === 'Unauthorized' ? 401 : 500;
        const message =
            error?.message === 'Unauthorized'
                ? 'Unauthorized'
                : 'Internal server error';
        return NextResponse.json({ message }, { status });
    }
}
