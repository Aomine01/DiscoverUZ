'use client';

import { useEffect, useState } from 'react';

/**
 * CSRF Token Hook
 * 
 * Reads the CSRF token from the cookie set by middleware
 * Used for API calls and form submissions
 */
export function useCSRFToken(): string | null {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Read CSRF token from cookie
        const cookies = document.cookie.split(';');
        const csrfCookie = cookies.find(c => c.trim().startsWith('__csrf_token='));

        if (csrfCookie) {
            const tokenValue = csrfCookie.split('=')[1];
            setToken(tokenValue);
        }
    }, []);

    return token;
}

/**
 * CSRF Protected Fetch
 * 
 * Wrapper around fetch that automatically includes CSRF token
 * 
 * USAGE:
 * ```tsx
 * const response = await csrfFetch('/api/contact', {
 *   method: 'POST',
 *   body: JSON.stringify(data)
 * });
 * ```
 */
export async function csrfFetch(url: string, options: RequestInit = {}): Promise<Response> {
    // Read CSRF token from cookie
    const cookies = document.cookie.split(';');
    const csrfCookie = cookies.find(c => c.trim().startsWith('__csrf_token='));
    const token = csrfCookie?.split('=')[1];

    if (!token) {
        throw new Error('CSRF token not found. Ensure middleware is running.');
    }

    // Add CSRF header for mutations
    const headers = new Headers(options.headers);
    if (options.method && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(options.method.toUpperCase())) {
        headers.set('x-csrf-token', token);
    }

    return fetch(url, {
        ...options,
        headers,
    });
}

/**
 * CSRF Token Input Component
 * 
 * Hidden input field for Server Actions
 * 
 * USAGE:
 * ```tsx
 * <form action={serverAction}>
 *   <CSRFTokenInput />
 *   <input name="email" />
 *   <button>Submit</button>
 * </form>
 * ```
 */
export function CSRFTokenInput() {
    const token = useCSRFToken();

    if (!token) {
        return null; // Don't render until token is loaded
    }

    return (
        <input
            type="hidden"
            name="csrf_token"
            value={token}
            readOnly
        />
    );
}
