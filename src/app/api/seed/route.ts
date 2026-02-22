import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const adminExists = await User.findOne({ role: 'admin' }).select('_id');
        if (adminExists) {
            await requireAdmin(request);
        }

        const usersToSeed = [
            {
                name: 'Regular User',
                email: 'user@gmail.com',
                password: '123456',
                role: 'student'
            },
            {
                name: 'Admin User',
                email: 'admin1@gmail.com',
                password: '123456',
                role: 'admin'
            }
        ];

        const results = [];

        for (const userData of usersToSeed) {
            const existingUser = await User.findOne({ email: userData.email });
            if (existingUser) {
                // If user exists, we might want to update password, but for now just skip
                // ensuring the password matches requires hashing comparison which is complex here
                // assuming "seed" means create if not exists.
                // If user wants to force reset, they might need to delete first or we update.
                // Let's just create if not exists as per standard seeding.
                results.push(`User ${userData.email} already exists.`);
            } else {
                // The pre-save hook in User model will handle hashing
                await User.create(userData);
                results.push(`User ${userData.email} created successfully.`);
            }
        }

        return NextResponse.json({ message: 'Seeding complete', results });
    } catch (error: any) {
        console.error('Seeding error:', error);
        const status =
            error?.message === 'Unauthorized'
                ? 401
                : error?.message === 'Forbidden'
                ? 403
                : 500;
        const message =
            error?.message === 'Unauthorized'
                ? 'Unauthorized'
                : error?.message === 'Forbidden'
                ? 'Forbidden'
                : 'Seeding failed';
        return NextResponse.json({ message, error: String(error) }, { status });
    }
}
