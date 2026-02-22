import { Request, Response } from 'express';
import Certificate from '../models/Certificate';
import Enrollment from '../models/Enrollment';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Issue a certificate
// @route   POST /api/certificates
// @access  Admin
export const issueCertificate = async (req: Request, res: Response) => {
    const { enrollmentId } = req.body;

    try {
        const enrollment = await Enrollment.findById(enrollmentId).populate('course student');

        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        const existingCert = await Certificate.findOne({ enrollment: enrollmentId } as any);
        if (existingCert) {
            return res.status(400).json({ message: 'Certificate already issued for this enrollment' });
        }

        const certificateNumber = `CERT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const certificate = await Certificate.create({
            student: (enrollment.student as any)._id,
            course: (enrollment.course as any)._id,
            enrollment: enrollment._id,
            certificateNumber,
            issueDate: new Date(),
        } as any);

        res.status(201).json(certificate);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

// @desc    Get my certificates
// @route   GET /api/certificates/my
// @access  Private
export const getMyCertificates = async (req: AuthRequest, res: Response) => {
    const userId = req.user?._id;

    if (!userId) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const certificates = await Certificate.find({ student: userId } as any).populate('course');
        res.json(certificates);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Admin
export const getAllCertificates = async (req: Request, res: Response) => {
    try {
        const certificates = await Certificate.find({}).populate('course student');
        res.json(certificates);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
