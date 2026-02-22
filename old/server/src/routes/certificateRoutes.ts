import express from 'express';
import { issueCertificate, getMyCertificates, getAllCertificates } from '../controllers/certificateController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .post(protect, admin, issueCertificate)
    .get(protect, admin, getAllCertificates);

router.get('/my', protect, getMyCertificates);

export default router;
