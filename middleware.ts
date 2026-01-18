import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from 'jose';
import { generateSignedCSRFToken } from './lib/csrf';

/**
 * PRODUCTION SECURITY MIDDLEWARE
 * 
 * Features:
 * - Per-request CSP nonce generation (eliminates unsafe-inline)
 * - Request size limits for API routes
 * - Secure nonce cookie for server components
 * - Authentication route protection
 * - Session verification and cleanup
 * 
 * The nonce is generated per-request and passed to:
 * 1. CSP header (script-src 'nonce-XXXXX')
 * 2. Secure cookie (__csp_nonce) so server components can read it
 * 
 * Note: Uses Web Crypto API (not Node.js crypto) for Edge Runtime compatibility
 */

// Maximum request body size (bytes)
const MAX_REQUEST_SIZE = 10 * 1024 * 1024; // 10MB

// Authentication configuration
// SECURITY: Fail-secure - throw error if SESSION_SECRET is missing
if (!process.env.SESSION_SECRET) {
    throw new Error('CRITICAL: SESSION_SECRET environment variable is required. Generate with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"');
}
const SECRET_KEY = new TextEncoder().encode(process.env.SESSION_SECRET);
const COOKIE_NAME = 'session';
const protectedRoutes = ['/dashboard', '/admin'];
const authRoutes = ['/login', '/signup'];

/**
 * Generate a cryptographically secure random nonce using Web Crypto API
 * Compatible with Edge Runtime (no Node.js crypto module needed)
 */
function generateNonce(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    // Convert to base64
    return btoa(String.fromCharCode(...array));
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Content-Length check for API routes
    if (pathname.startsWith("/api/")) {
        const contentLength = request.headers.get("content-length");

        if (contentLength && parseInt(contentLength) > MAX_REQUEST_SIZE) {
            return NextResponse.json(
                { error: "Request too large" },
                { status: 413 }
            );
        }

        // API routes don't need CSP nonce or auth checks
        return NextResponse.next();
    }

    // === AUTHENTICATION LOGIC ===
    const token = request.cookies.get(COOKIE_NAME)?.value;
    let session = null;

    // Verify session if token exists
    if (token) {
        try {
            const { payload } = await jwtVerify(token, SECRET_KEY);
            session = payload;
        } catch (error) {
            // Invalid/expired token - will be cleaned up below
            session = null;
        }
    }

    // Check if current path requires authentication
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

    // Redirect unauthenticated users away from protected routes
    if (isProtectedRoute && !session) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete(COOKIE_NAME); // Clean up invalid session
        return response;
    }

    // Redirect authenticated users away from auth pages
    if (isAuthRoute && session) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If session is invalid, clean up cookie
    if (token && !session) {
        const response = NextResponse.next();
        response.cookies.delete(COOKIE_NAME);
        // Continue with CSP setup below
    }

    // === CSP SECURITY LOGIC ===
    // Generate nonce for HTML pages using Web Crypto API
    const nonce = generateNonce();

    // === CSRF PROTECTION ===
    // Generate CSRF token if not present (stateless Double Submit Cookie pattern)
    const existingCSRFToken = request.cookies.get('__csrf_token')?.value;
    const csrfToken = existingCSRFToken || await generateSignedCSRFToken();

    // Build production-grade CSP with Next.js compatibility
    // For DEVELOPMENT: Need 'unsafe-inline' and 'unsafe-eval' for Next.js HMR and React DevTools
    // For PRODUCTION: strict-dynamic + nonce provides strong security
    const isDev = process.env.NODE_ENV === 'development';

    const csp = [
        "default-src 'self'",
        isDev
            ? `script-src 'self' 'unsafe-inline' 'unsafe-eval' 'nonce-${nonce}' https://api-maps.yandex.ru https://*.yandex.ru https://yastatic.net`
            : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://api-maps.yandex.ru https://*.yandex.ru https://yastatic.net`,
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://yastatic.net",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https: blob:",
        "connect-src 'self' https://*.yandex.ru https://api-maps.yandex.ru https://yastatic.net",
        "frame-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'self'",
        isDev ? "" : "upgrade-insecure-requests",
    ].filter(Boolean).join("; ");

    const response = NextResponse.next();

    // Set CSP header
    response.headers.set("Content-Security-Policy", csp);

    // Set x-nonce header for Next.js to read (recommended approach)
    response.headers.set("x-nonce", nonce);

    // Set nonce cookie for server components to read (backup method)
    // Note: httpOnly=false so server components can access via cookies()
    // Short-lived (60s) and secure/sameSite for safety
    response.cookies.set("__csp_nonce", nonce, {
        httpOnly: false, // Server components need to read this
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60, // 60 seconds
    });

    // Set CSRF token cookie (httpOnly=false so client can read for form submissions)
    // SECURITY: Token is HMAC-signed to prevent forgery
    if (!existingCSRFToken) {
        response.cookies.set("__csrf_token", csrfToken, {
            httpOnly: false, // Client needs to read this for forms/API calls
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24, // 24 hours
        });
    }

    return response;
}

// Configure which routes this middleware runs on
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)", // All pages except API, static, images
    ],
};
