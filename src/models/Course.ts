import mongoose, { Document, Schema } from 'mongoose';

interface ILesson {
    title: string;
    type: 'video' | 'text' | 'quiz';
    videoUrl?: string;
    textContent?: string;
    duration?: number; // In minutes
    freePreview: boolean;
}

interface IModule {
    title: string;
    lessons: ILesson[];
}

export interface ICourse extends Document {
    title: string;
    description: string;
    image: string;
    tag?: string;
    duration?: string;
    students?: number;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Beginner to Advanced';
    tags: string[];
    price: number;
    originalPrice?: number;
    rating: number;
    reviewsCount: number;
    instructor: mongoose.Schema.Types.ObjectId;
    modules: IModule[];
    learningPoints: string[];
    requirements: string[];
}

const LessonSchema = new Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['video', 'text', 'quiz'], required: true },
    videoUrl: { type: String },
    textContent: { type: String },
    duration: { type: Number },
    freePreview: { type: Boolean, default: false },
});

const ModuleSchema = new Schema({
    title: { type: String, required: true },
    lessons: [LessonSchema],
});

const CourseSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        tag: { type: String, default: '' },
        duration: { type: String, default: '' },
        students: { type: Number, default: 0 },
        level: { type: String, required: true },
        tags: [{ type: String }],
        price: { type: Number, default: 0 },
        originalPrice: { type: Number },
        rating: { type: Number, default: 0 },
        reviewsCount: { type: Number, default: 0 },
        instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
        modules: [ModuleSchema],
        learningPoints: [{ type: String }],
        requirements: [{ type: String }],
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
