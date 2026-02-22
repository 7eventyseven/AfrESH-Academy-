import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export type AuthRole = 'student' | 'admin';

export interface AuthUser {
    userId: string;
    role: AuthRole;
}

export async function getAuthUser(request: NextRequest): Promise<AuthUser | null> {
    const cookieToken = request.cookies.get('token')?.value;
    const authHeader =
        request.headers.get('authorization') || request.headers.get('Authorization');

    let token = cookieToken;
    if (!token && authHeader?.startsWith('Bearer ')) {
        token = authHeader.slice('Bearer '.length);
    }

    if (!token) return null;
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    let payload: Record<string, unknown>;
    try {
        const verified = await jwtVerify(token, secret);
        payload = verified.payload as unknown as Record<string, unknown>;
    } catch {
        return null;
    }

    const userId = typeof payload.userId === 'string' ? payload.userId : undefined;
    const role = payload.role === 'student' || payload.role === 'admin' ? payload.role : undefined;

    if (!userId || !role) return null;
    return { userId, role };
}

export async function requireAuth(request: NextRequest): Promise<AuthUser> {
    const user = await getAuthUser(request);
    if (!user) {
        throw new Error('Unauthorized');
    }
    return user;
}

export async function requireAdmin(request: NextRequest): Promise<AuthUser> {
    const user = await requireAuth(request);
    if (user.role !== 'admin') {
        throw new Error('Forbidden');
    }
    return user;
}
