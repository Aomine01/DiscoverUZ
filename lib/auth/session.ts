import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/db';

// SECURITY: Fail-secure - throw error if SESSION_SECRET is missing
if (!process.env.SESSION_SECRET) {
    throw new Error('CRITICAL: SESSION_SECRET environment variable is required. Generate with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"');
}
const SECRET_KEY = new TextEncoder().encode(process.env.SESSION_SECRET);

const COOKIE_NAME = 'session';

export interface SessionData {
    userId: string;
    email: string;
    role: string;
}

/**
 * Get current session (READ-ONLY)
 * 
 * @security CRITICAL - This function NEVER modifies cookies
 * - Only reads cookies
 * - If session is invalid, returns null
 * - Middleware handles cleanup/redirects
 * 
 * @returns SessionData | null
 */
export async function getSession(): Promise<SessionData | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) return null;

    try {
        // Verify JWT signature
        const { payload } = await jwtVerify(token, SECRET_KEY);

        // Check database for revocation/expiry
        const session = await prisma.session.findUnique({
            where: { token },
            include: { user: true },
        });

        if (!session || session.expiresAt < new Date()) {
            // ✅ CRITICAL: Only return null, don't delete cookies here
            // Middleware will handle cleanup
            return null;
        }

        return {
            userId: session.user.id,
            email: session.user.email,
            role: session.user.role,
        };
    } catch (error) {
        // Invalid JWT - return null, middleware handles redirect
        return null;
    }
}

/**
 * Get current user from session
 * Helper function for Server Components
 */
export async function getCurrentUser() {
    const session = await getSession();
    if (!session) return null;

    return prisma.user.findUnique({
        where: { id: session.userId },
        select: {
            id: true,
            email: true,
            name: true,
            image: true,
            role: true,
            emailVerified: true,
            createdAt: true,
        },
    });
}

/**
 * Require authenticated session
 * Throws error if not authenticated (use in Server Actions)
 */
export async function requireAuth() {
    const session = await getSession();
    if (!session) {
        throw new Error('Unauthorized');
    }
    return session;
}
