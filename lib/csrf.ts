/**
 * CSRF Protection - Double Submit Cookie Pattern with HMAC Signing
 * 
 * SECURITY STRATEGY:
 * - Stateless: No database lookups (fast, Edge Runtime compatible)
 * - HMAC-signed tokens: Prevents token forgery
 * - Double Submit: Cookie + Header/Form field must match
 * - Fail-secure: Rejects requests by default if validation fails
 * 
 * EDGE RUNTIME COMPATIBLE:
 * - Uses Web Crypto API (crypto.subtle) instead of Node.js crypto
 * - No fs, no Buffer (uses Uint8Array)
 */

import { NextRequest } from 'next/server';

// CSRF token configuration
const CSRF_COOKIE_NAME = '__csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';
const TOKEN_LENGTH = 32; // 32 bytes = 256 bits

/**
 * Get CSRF secret from environment (for HMAC signing)
 * Uses SESSION_SECRET as base, but can be separate
 */
function getCSRFSecret(): string {
    const secret = process.env.SESSION_SECRET;
    if (!secret) {
        throw new Error('SESSION_SECRET required for CSRF token signing');
    }
    return secret;
}

/**
 * Generate cryptographically secure random token
 * Edge Runtime compatible (uses Web Crypto API)
 */
export function generateCSRFToken(): string {
    const array = new Uint8Array(TOKEN_LENGTH);
    crypto.getRandomValues(array);
    // Convert to base64url (URL-safe)
    return btoa(String.fromCharCode(...array))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

/**
 * Create HMAC signature for token
 * Uses Web Crypto API (Edge Runtime compatible)
 */
async function signToken(token: string): Promise<string> {
    const secret = getCSRFSecret();
    const encoder = new TextEncoder();

    // Import secret key
    const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    // Sign token
    const signature = await crypto.subtle.sign(
        'HMAC',
        key,
        encoder.encode(token)
    );

    // Convert to base64url
    const signatureArray = new Uint8Array(signature);
    return btoa(String.fromCharCode(...signatureArray))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

/**
 * Verify HMAC signature
 */
async function verifyToken(token: string, signature: string): Promise<boolean> {
    try {
        const expectedSignature = await signToken(token);
        return expectedSignature === signature;
    } catch {
        return false;
    }
}

/**
 * Generate signed CSRF token (token.signature format)
 */
export async function generateSignedCSRFToken(): Promise<string> {
    const token = generateCSRFToken();
    const signature = await signToken(token);
    return `${token}.${signature}`;
}

/**
 * Validate CSRF token from request
 * 
 * VALIDATION LOGIC:
 * 1. Extract token from cookie
 * 2. Extract token from header or form field
 * 3. Verify both exist and match
 * 4. Verify HMAC signature
 * 
 * @throws Error if validation fails (fail-secure)
 */
export async function validateCSRFToken(request: NextRequest): Promise<void> {
    // 1. Get token from cookie
    const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
    if (!cookieToken) {
        throw new Error('CSRF token missing from cookie');
    }

    // 2. Get token from header or form data
    let headerToken = request.headers.get(CSRF_HEADER_NAME);

    // If not in header, check form data (for Server Actions)
    if (!headerToken && request.headers.get('content-type')?.includes('form')) {
        try {
            const formData = await request.clone().formData();
            headerToken = formData.get('csrf_token') as string | null;
        } catch {
            // Not form data, continue
        }
    }

    if (!headerToken) {
        throw new Error('CSRF token missing from request');
    }

    // 3. Verify tokens match (Double Submit)
    if (cookieToken !== headerToken) {
        throw new Error('CSRF token mismatch');
    }

    // 4. Verify HMAC signature
    const parts = cookieToken.split('.');
    if (parts.length !== 2) {
        throw new Error('Invalid CSRF token format');
    }

    const [token, signature] = parts;
    const isValid = await verifyToken(token, signature);

    if (!isValid) {
        throw new Error('CSRF token signature invalid');
    }
}

/**
 * Check if request method requires CSRF protection
 */
export function requiresCSRFProtection(method: string): boolean {
    const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
    return !safeMethods.includes(method.toUpperCase());
}

/**
 * Helper for API routes: Validate CSRF or return error response
 */
export async function validateCSRFOrReject(
    request: NextRequest
): Promise<{ valid: true } | { valid: false; error: Response }> {
    // Skip validation for safe methods
    if (!requiresCSRFProtection(request.method)) {
        return { valid: true };
    }

    try {
        await validateCSRFToken(request);
        return { valid: true };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'CSRF validation failed';
        return {
            valid: false,
            error: new Response(
                JSON.stringify({ error: 'Invalid CSRF token' }),
                {
                    status: 403,
                    headers: { 'Content-Type': 'application/json' }
                }
            )
        };
    }
}
