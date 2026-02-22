import { Request, Response } from 'express';
import Teacher from '../models/Teacher';

export const getTeachers = async (req: Request, res: Response) => {
    try {
        const teachers = await Teacher.find({});
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const createTeacher = async (req: Request, res: Response) => {
    try {
        const teacher = new Teacher(req.body);
        const createdTeacher = await teacher.save();
        res.status(201).json(createdTeacher);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const updateTeacher = async (req: Request, res: Response) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (teacher) {
            Object.assign(teacher, req.body);
            const updatedTeacher = await teacher.save();
            res.json(updatedTeacher);
        } else {
            res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const deleteTeacher = async (req: Request, res: Response) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (teacher) {
            await teacher.deleteOne();
            res.json({ message: 'Teacher removed' });
        } else {
            res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
