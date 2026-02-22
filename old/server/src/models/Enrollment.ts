import mongoose, { Document, Schema } from 'mongoose';

export interface IEnrollment extends Document {
    student: mongoose.Schema.Types.ObjectId;
    course: mongoose.Schema.Types.ObjectId;
    completedLessons: mongoose.Schema.Types.ObjectId[]; // IDs of completed lessons
    lastAccessedLesson: mongoose.Schema.Types.ObjectId; // ID of the last viewed lesson
    progress: number; // Percentage 0-100
    paymentStatus: 'pending' | 'completed' | 'failed';
    enrolledAt: Date;
}

const EnrollmentSchema: Schema = new Schema(
    {
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
        completedLessons: [{ type: mongoose.Schema.Types.ObjectId }],
        lastAccessedLesson: { type: mongoose.Schema.Types.ObjectId },
        progress: { type: Number, default: 0 },
        paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
        enrolledAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
