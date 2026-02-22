import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
    paystackPublicKey: string;
    paystackSecretKey: string;
}

const SettingsSchema = new Schema<ISettings>({
    paystackPublicKey: { type: String, default: '' },
    paystackSecretKey: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
