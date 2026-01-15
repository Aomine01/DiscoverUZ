/**
 * Security-focused sanitization utilities using DOMPurify
 * - Zero-tag allowlist (all HTML tags stripped)
 * - Prevents javascript: URIs
 * - Unicode normalization
 * - Whitespace canonicalization
 * 
 * NOTE: Uses dynamic imports to prevent SSR/build errors with ESM modules
 */

// DOMPurify instance (loaded dynamically)
let purifyInstance: any = null;

// Configure DOMPurify with strict settings
const PURIFY_CONFIG = {
    ALLOWED_TAGS: [], // Zero-tag allowlist - strip ALL HTML
    ALLOWED_ATTR: [], // No attributes allowed
    KEEP_CONTENT: true, // Keep text content, strip tags
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ["script", "style", "iframe", "object", "embed"],
    FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover"],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|sms):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
};

/**
 * Lazy load DOMPurify only when needed (browser-only)
 */
async function getDOMPurify() {
    if (purifyInstance) return purifyInstance;

    // Only load in browser
    if (typeof window === 'undefined') {
        throw new Error('DOMPurify can only be used in the browser');
    }

    const DOMPurifyModule = await import('isomorphic-dompurify');
    purifyInstance = DOMPurifyModule.default;
    return purifyInstance;
}

/**
 * Sanitize a single string input
 * - Removes all HTML tags
 * - Normalizes Unicode to NFC
 * - Trims and collapses whitespace
 * - Prevents javascript: URIs
 */
export async function sanitizeInput(input: string | undefined | null): Promise<string> {
    if (!input) return "";

    // 1. Normalize Unicode (prevent Unicode-based evasion)
    let sanitized = input.normalize("NFC");

    // 2. Strip HTML tags using DOMPurify (loaded dynamically)
    const DOMPurify = await getDOMPurify();
    sanitized = DOMPurify.sanitize(sanitized, PURIFY_CONFIG);

    // 3. Trim whitespace
    sanitized = sanitized.trim();

    // 4. Collapse multiple spaces/newlines
    sanitized = sanitized.replace(/\s+/g, " ");

    // 5. Remove any remaining null bytes or control characters
    sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

    return sanitized;
}

/**
 * Sanitize an entire form data object
 * Recursively sanitizes all string values
 */
export async function sanitizeFormData<T extends Record<string, any>>(data: T): Promise<T> {
    const sanitized = {} as T;

    for (const [key, value] of Object.entries(data)) {
        if (typeof value === "string") {
            sanitized[key as keyof T] = (await sanitizeInput(value)) as T[keyof T];
        } else if (value && typeof value === "object") {
            sanitized[key as keyof T] = await sanitizeFormData(value);
        } else {
            sanitized[key as keyof T] = value;
        }
    }

    return sanitized;
}

/**
 * Escape HTML special characters for safe display
 * Use this when displaying user input in HTML context
 */
export function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;",
    };

    return text.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Sanitize and validate email specifically
 * - Normalizes to lowercase
 * - Removes whitespace
 * - Strips any HTML attempts
 */
export async function sanitizeEmail(email: string): Promise<string> {
    let sanitized = await sanitizeInput(email);
    sanitized = sanitized.toLowerCase();
    sanitized = sanitized.replace(/\s/g, "");
    return sanitized;
}

/**
 * Check if a string contains potential XSS payloads
 * Returns true if suspicious patterns detected
 */
export function containsXSS(input: string): boolean {
    const xssPatterns = [
        /<script/i,
        /javascript:/i,
        /onerror=/i,
        /onload=/i,
        /<iframe/i,
        /eval\(/i,
        /expression\(/i,
        /vbscript:/i,
        /on\w+\s*=/i, // Any on* event handler
    ];

    return xssPatterns.some((pattern) => pattern.test(input));
}

/**
 * Enforce maximum byte size (UTF-8)
 * Prevents oversized inputs that could cause issues
 */
export function enforceMaxBytes(input: string, maxBytes: number): string {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(input);

    if (bytes.length <= maxBytes) {
        return input;
    }

    // Truncate to max bytes (may cut UTF-8 char in middle)
    const decoder = new TextDecoder("utf-8", { fatal: false });
    return decoder.decode(bytes.slice(0, maxBytes));
}
