import express from 'express';
import { upload } from '../middleware/uploadMiddleware';

const router = express.Router();

router.post('/image', upload.single('image'), (req: any, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ message: 'Image uploaded successfully', url: fileUrl });
});

router.post('/video', upload.single('video'), (req: any, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ message: 'Video uploaded successfully', url: fileUrl });
});

// For backward compatibility (if any)
router.post('/', upload.single('image'), (req: any, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ message: 'File uploaded successfully', url: fileUrl });
});

export default router;
