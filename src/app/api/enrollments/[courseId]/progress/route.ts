import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Enrollment from '@/models/Enrollment';
import Course from '@/models/Course';
import { requireAuth } from '@/lib/auth';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ courseId: string }> }
) {
    try {
        const authUser = await requireAuth(request);
        const { courseId } = await params;
        const { lessonId, isCompleted } = await request.json();

        if (!lessonId) {
            return NextResponse.json(
                { message: 'lessonId is required' },
                { status: 400 }
            );
        }

        await connectDB();

        const enrollment = await Enrollment.findOne({
            student: authUser.userId,
            course: courseId,
        });

        if (!enrollment) {
            return NextResponse.json(
                { message: 'Enrollment not found' },
                { status: 404 }
            );
        }

        const lessonIdStr = String(lessonId);
        const completedSet = new Set(
            (enrollment.completedLessons || []).map((l: any) => String(l))
        );

        if (isCompleted) {
            completedSet.add(lessonIdStr);
        } else {
            completedSet.delete(lessonIdStr);
        }

        enrollment.completedLessons = Array.from(completedSet) as any;
        enrollment.lastAccessedLesson = lessonId;

        const course = await Course.findById(courseId);
        const totalLessons =
            course?.modules?.reduce(
                (sum: number, mod: any) => sum + (mod.lessons?.length || 0),
                0
            ) || 0;

        enrollment.progress =
            totalLessons > 0
                ? Math.min(
                      100,
                      Math.round((completedSet.size / totalLessons) * 100)
                  )
                : 0;

        await enrollment.save();

        return NextResponse.json(enrollment);
    } catch (error: any) {
        const status = error?.message === 'Unauthorized' ? 401 : 500;
        const message =
            error?.message === 'Unauthorized'
                ? 'Unauthorized'
                : 'Internal server error';
        return NextResponse.json({ message }, { status });
    }
}
