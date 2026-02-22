import { Request, Response } from 'express';
import Course from '../models/Course';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public
export const getCourses = async (req: Request, res: Response) => {
    try {
        const courses = await Course.find({});
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Fetch single course
// @route   GET /api/courses/:id
// @access  Public
export const getCourseById = async (req: Request, res: Response) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Admin
export const createCourse = async (req: AuthRequest, res: Response) => {
    try {
        const {
            title, description, image, level, price, originalPrice,
            tags, modules, learningPoints, requirements, instructor
        } = req.body;

        const course = new Course({
            title,
            description,
            image,
            level,
            price,
            originalPrice,
            tags,
            modules,
            learningPoints,
            requirements,
            instructor // This should be a Teacher ID
        });

        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Admin
export const updateCourse = async (req: AuthRequest, res: Response) => {
    try {
        const {
            title, description, image, level, price, originalPrice,
            tags, modules, learningPoints, requirements, instructor
        } = req.body;

        const course = await Course.findById(req.params.id);

        if (course) {
            course.title = title || course.title;
            course.description = description || course.description;
            course.image = image || course.image;
            course.level = level || course.level;
            course.price = price || course.price;
            course.originalPrice = originalPrice || course.originalPrice;
            course.tags = tags || course.tags;
            course.modules = modules || course.modules;
            course.learningPoints = learningPoints || course.learningPoints;
            course.requirements = requirements || course.requirements;
            course.instructor = instructor || course.instructor;

            const updatedCourse = await course.save();
            res.json(updatedCourse);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
export const deleteCourse = async (req: AuthRequest, res: Response) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            await course.deleteOne();
            res.json({ message: 'Course removed' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
