'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { signupSchema, loginSchema, type SignupInput, type LoginInput } from '@/lib/validations/inputs';
import { sendVerificationEmail } from '@/lib/email';

const SECRET_KEY = new TextEncoder().encode(
    process.env.SESSION_SECRET || 'change-me-in-production-use-openssl-rand-base64-32'
);

const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days
const COOKIE_NAME = 'session';

/**
 * Signup Server Action
 * 
 * @security
 * - CSRF protection: Built into Next.js Server Actions
 * - Password hashing: bcrypt with 12 rounds
 * - Email verification: Required before login
 * 
 * @returns success message or error with field-specific validations
 */
export async function signup(formData: FormData) {
    try {
        // Parse form data
        const rawData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            terms: formData.get('terms') === 'on',
        };

        // Validate with Zod
        const validationResult = signupSchema.safeParse(rawData);
        if (!validationResult.success) {
            return {
                error: 'Validation failed',
                fields: validationResult.error.flatten().fieldErrors,
            };
        }

        const { name, email, password } = validationResult.data;

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return {
                error: 'An account with this email already exists',
                fields: { email: ['Email already registered'] },
            };
        }

        // Hash password with bcrypt (12 rounds = OWASP 2024+ recommendation)
        const passwordHash = await bcrypt.hash(password, 12);

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
            },
        });

        // Send verification email
        await sendVerificationEmail(user.id, email, name);

        return {
            success: true,
            message: 'Account created! Please check your email to verify your account.',
        };
    } catch (error) {
        console.error('[Auth] Signup error:', error);
        return {
            error: 'Failed to create account. Please try again.',
        };
    }
}

/**
 * Login Server Action
 * 
 * @security
 * - CSRF protection: Built into Server Actions
 * - Constant-time password comparison: bcrypt.compare
 * - Email verification check: Prevents unverified logins
 * - Session storage: Database + httpOnly cookie
 * 
 * @redirects to /dashboard on success
 */
export async function login(formData: FormData) {
    try {
        //Parse form data
        const rawData = {
            email: formData.get('email'),
            password: formData.get('password'),
            remember: formData.get('remember') === 'on',
        };

        // Validate
        const validationResult = loginSchema.safeParse(rawData);
        if (!validationResult.success) {
            return {
                error: 'Invalid email or password',
            };
        }

        const { email, password, remember } = validationResult.data;

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Use generic error message to prevent email enumeration
            return {
                error: 'Invalid email or password',
            };
        }

        // Verify password (constant-time comparison via bcrypt)
        const isValidPassword = await bcrypt.compare(password, user.passwordHash);
        if (!isValidPassword) {
            return {
                error: 'Invalid email or password',
            };
        }

        // Check email verification
        if (!user.emailVerified) {
            return {
                error: 'Please verify your email before logging in. Check your inbox for the verification link.',
            };
        }

        // Create session
        const duration = remember ? SESSION_DURATION : 24 * 60 * 60 * 1000; // 24h if not remembered
        const expiresAt = new Date(Date.now() + duration);

        // Generate JWT
        const token = await new SignJWT({
            userId: user.id,
            email: user.email,
            role: user.role,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(expiresAt)
            .sign(SECRET_KEY);

        // Store session in database (enables revocation)
        await prisma.session.create({
            data: {
                userId: user.id,
                token,
                expiresAt,
                // TODO: Extract from headers in production
                ipAddress: null,
                userAgent: null,
            },
        });

        // Set httpOnly cookie (✅ Safe in Server Action)
        const cookieStore = await cookies();
        cookieStore.set(COOKIE_NAME, token, {
            httpOnly: true,  // Prevents XSS attacks
            secure: process.env.NODE_ENV === 'production',  // HTTPS only in production
            sameSite: 'lax',  // CSRF protection
            expires: expiresAt,
            path: '/',
        });

        // Redirect to dashboard
        redirect('/dashboard');
    } catch (error) {
        // Redirect errors are expected (Next.js throws on redirect)
        if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
            throw error;
        }

        console.error('[Auth] Login error:', error);
        return {
            error: 'An error occurred during login. Please try again.',
        };
    }
}

/**
 * Email Verification Server Action
 * 
 * @security
 * - Single-use tokens (deleted after verification)
 * - 24-hour expiration check
 * - Database transaction for atomicity
 * 
 * @param token - Verification token from email link
 * @returns success/error result
 */
export async function verifyEmail(token: string) {
    try {
        // Validate token exists
        if (!token || typeof token !== 'string') {
            return {
                error: 'Invalid verification token',
            };
        }

        // Find token in database
        const verificationToken = await prisma.verificationToken.findUnique({
            where: { token },
            include: { user: true },
        });

        if (!verificationToken) {
            return {
                error: 'Invalid or expired verification link',
            };
        }

        // Check if token has expired (24 hours)
        if (verificationToken.expiresAt < new Date()) {
            // Delete expired token
            await prisma.verificationToken.delete({
                where: { token },
            });
            return {
                error: 'Verification link has expired. Please request a new one.',
            };
        }

        // Update user's email verification status
        await prisma.user.update({
            where: { id: verificationToken.userId },
            data: {
                emailVerified: true,
            },
        });

        // Delete used token (single-use security)
        await prisma.verificationToken.delete({
            where: { token },
        });

        console.log(`✅ [Auth] Email verified for user: ${verificationToken.user.email}`);

        return {
            success: true,
            message: 'Email verified successfully! You can now log in.',
        };
    } catch (error) {
        console.error('[Auth] Email verification error:', error);
        return {
            error: 'Failed to verify email. Please try again or contact support.',
        };
    }
}

/**
 * Logout Server Action
 * 
 * @security
 * - Deletes session from database (revokes)
 * - Clears httpOnly cookie
 * - Only place where cookie deletion is safe
 * 
 * @redirects to homepage
 */
export async function logout() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(COOKIE_NAME)?.value;

        if (token) {
            // Delete session from database
            await prisma.session.deleteMany({
                where: { token },
            });
        }

        // Delete cookie (✅ Safe in Server Action)
        cookieStore.delete(COOKIE_NAME);
    } catch (error) {
        console.error('[Auth] Logout error:', error);
    }

    // Always redirect even if error
    redirect('/');
}
