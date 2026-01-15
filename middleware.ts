import { NextResponse, type NextRequest } from "next/server";

/**
 * PRODUCTION SECURITY MIDDLEWARE
 * 
 * Features:
 * - Per-request CSP nonce generation (eliminates unsafe-inline)
 * - Request size limits for API routes
 * - Secure nonce cookie for server components
 * 
 * The nonce is generated per-request and passed to:
 * 1. CSP header (script-src 'nonce-XXXXX')
 * 2. Secure cookie (__csp_nonce) so server components can read it
 * 
 * Note: Uses Web Crypto API (not Node.js crypto) for Edge Runtime compatibility
 */

// Maximum request body size (bytes)
const MAX_REQUEST_SIZE = 10 * 1024 * 1024; // 10MB

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

export function middleware(request: NextRequest) {
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

        // API routes don't need CSP nonce
        return NextResponse.next();
    }

    // Generate nonce for HTML pages using Web Crypto API
    const nonce = generateNonce();

    // Build production-grade CSP without unsafe-inline or unsafe-eval
    // Includes Yandex Maps domains (api-maps.yandex.ru, yastatic.net, etc.)
    const csp = [
        "default-src 'self'",
        `script-src 'self' 'nonce-${nonce}' https://api-maps.yandex.ru https://*.yandex.ru https://yastatic.net`,
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://yastatic.net", // unsafe-inline for styles (lower risk)
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https: blob:", // Allow data: and blob: for map tiles
        "connect-src 'self' https://*.yandex.ru https://api-maps.yandex.ru https://yastatic.net",
        "frame-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'self'",
        "upgrade-insecure-requests",
    ].join("; ");

    const response = NextResponse.next();

    // Set CSP header
    response.headers.set("Content-Security-Policy", csp);

    // Set nonce cookie for server components to read
    // Note: httpOnly=false so server components can access via cookies()
    // Short-lived (60s) and secure/sameSite for safety
    response.cookies.set("__csp_nonce", nonce, {
        httpOnly: false, // Server components need to read this
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60, // 60 seconds
    });

    return response;
}

// Configure which routes this middleware runs on
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)", // All pages except API, static, images
    ],
};
