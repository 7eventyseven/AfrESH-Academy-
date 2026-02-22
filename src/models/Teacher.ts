import mongoose, { Document, Schema } from 'mongoose';

export interface ITeacher extends Document {
    name: string;
    email: string;
    avatar?: string;
    title: string;
    bio: string;
    specialization: string[];
}

const TeacherSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        avatar: { type: String },
        title: { type: String, required: true },
        bio: { type: String, required: true },
        specialization: [{ type: String }],
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', TeacherSchema);
