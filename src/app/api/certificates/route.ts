import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Certificate from '@/models/Certificate';
import Enrollment from '@/models/Enrollment';
import { requireAdmin } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        await requireAdmin(request);
        const { enrollmentId } = await request.json();

        if (!enrollmentId) {
            return NextResponse.json(
                { message: 'enrollmentId is required' },
                { status: 400 }
            );
        }

        await connectDB();

        const enrollment = await Enrollment.findById(enrollmentId);
        if (!enrollment) {
            return NextResponse.json(
                { message: 'Enrollment not found' },
                { status: 404 }
            );
        }

        if ((enrollment.progress || 0) < 100) {
            return NextResponse.json(
                { message: 'Course not completed' },
                { status: 400 }
            );
        }

        const existing = await Certificate.findOne({ enrollment: enrollmentId });
        if (existing) {
            return NextResponse.json(existing);
        }

        const certificateNumber = `AFR-${Date.now()}-${Math.floor(
            Math.random() * 1000
        )}`;

        const certificate = await Certificate.create({
            student: enrollment.student,
            course: enrollment.course,
            enrollment: enrollment._id,
            certificateNumber,
        });

        return NextResponse.json(certificate, { status: 201 });
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
