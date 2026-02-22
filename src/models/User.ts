import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: 'student' | 'admin';
    matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['student', 'admin'], default: 'student' },
    },
    {
        timestamps: true,
    }
);

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

type UserDocForHook = IUser & {
    isModified: (path: string) => boolean;
    password: string;
    email: string;
};

UserSchema.pre('save', async function (this: UserDocForHook) {
    if (!this.isModified('password')) {
        return;
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        console.error('Bcrypt error:', err);
        throw err;
    }
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
