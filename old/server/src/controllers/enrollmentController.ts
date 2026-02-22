import { Request, Response } from 'express';
import Enrollment from '../models/Enrollment';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Enroll in a course
// @route   POST /api/enrollments
// @access  Private
export const enrollCourse = async (req: AuthRequest, res: Response) => {
    const { courseId } = req.body;
    const userId = req.user?._id;

    if (!userId) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const existingEnrollment = await Enrollment.findOne({ student: userId, course: courseId } as any);

        if (existingEnrollment) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }

        const enrollment = await Enrollment.create({
            student: userId,
            course: courseId,
            paymentStatus: 'completed', // Simulating successful payment for MVP
        } as any);

        res.status(201).json(enrollment);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

// @desc    Get my enrollments
// @route   GET /api/enrollments/my
// @access  Private
export const getMyEnrollments = async (req: AuthRequest, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const enrollments = await Enrollment.find({ student: userId } as any).populate('course');
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// @desc    Update lesson progress
// @route   PUT /api/enrollments/:courseId/progress
// @access  Private
export const updateProgress = async (req: AuthRequest, res: Response) => {
    const { courseId } = req.params;
    const { lessonId, isCompleted } = req.body;
    const userId = req.user?._id;

    if (!userId) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const enrollment = await Enrollment.findOne({ student: userId, course: courseId } as any);

        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        enrollment.lastAccessedLesson = lessonId;

        if (isCompleted) {
            // Add to completedLessons if not already there (using string comparison)
            const lessonIdStr = lessonId.toString();
            const existing = enrollment.completedLessons.some(id => id.toString() === lessonIdStr);
            if (!existing) {
                enrollment.completedLessons.push(lessonId);
            }

            // Recalculate progress (Logic depends on fetching Course to get total lessons count)
            // For MVP, we pass progress from frontend, or just count completed
        }

        // Allow frontend to pass calculated progress or calculate it here by fetching course
        if (req.body.progress) {
            enrollment.progress = req.body.progress;
        }

        await enrollment.save();
        res.json(enrollment);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

// @desc    Get all enrollments
// @route   GET /api/enrollments
// @access  Admin
export const getAllEnrollments = async (req: Request, res: Response) => {
    try {
        const enrollments = await Enrollment.find({}).populate('course student');
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
