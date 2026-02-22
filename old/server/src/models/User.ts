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

UserSchema.pre('save', async function () {
    const user = this as any; // Cast to allow property access
    console.log('Pre-save hook triggered for user:', user.email);
    if (!user.isModified('password')) {
        console.log('Password not modified, skipping hash');
        return;
    }
    try {
        console.log('Hashing password...');
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        console.log('Password hashed successfully');
    } catch (err) {
        console.error('Bcrypt error:', err);
        throw err;
    }
});

export default mongoose.model<IUser>('User', UserSchema);
