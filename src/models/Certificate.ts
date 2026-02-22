import mongoose, { Document, Schema } from 'mongoose';

export interface ICertificate extends Document {
    student: mongoose.Schema.Types.ObjectId;
    course: mongoose.Schema.Types.ObjectId;
    enrollment: mongoose.Schema.Types.ObjectId;
    certificateNumber: string;
    issueDate: Date;
    downloadUrl?: string;
}

const CertificateSchema: Schema = new Schema(
    {
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
        enrollment: { type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment', required: true },
        certificateNumber: { type: String, required: true, unique: true },
        issueDate: { type: Date, default: Date.now },
        downloadUrl: { type: String },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Certificate || mongoose.model<ICertificate>('Certificate', CertificateSchema);
