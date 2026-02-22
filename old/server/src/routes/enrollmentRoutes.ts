import express from 'express';
import { enrollCourse, getMyEnrollments, updateProgress, getAllEnrollments } from '../controllers/enrollmentController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .post(protect, enrollCourse)
    .get(protect, admin, getAllEnrollments);

router.get('/my', protect, getMyEnrollments);
router.put('/:courseId/progress', protect, updateProgress);

export default router;
