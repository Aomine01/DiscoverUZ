import { z } from "zod";

/**
 * Security-focused validation schemas using Zod
 * - Strict length limits to prevent buffer overflow
 * - Email format validation
 * - HTML tag detection and rejection
 * - Special character restrictions where appropriate
 */

// XSS pattern detection regex
const XSS_PATTERNS = /<script|javascript:|onerror=|onload=|<iframe|eval\(|expression\(/i;

// HTML tag detection
const HTML_TAG_PATTERN = /<[^>]*>/;

// Custom refinement to detect XSS attempts
const noXSS = (val: string) => !XSS_PATTERNS.test(val);
const noHTMLTags = (val: string) => !HTML_TAG_PATTERN.test(val);

// ===== CONTACT FORM SCHEMA =====
export const contactFormSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be less than 100 characters")
        .trim()
        .refine(noXSS, "Invalid characters detected")
        .refine(noHTMLTags, "HTML tags are not allowed"),

    email: z
        .string()
        .email("Please enter a valid email address")
        .max(255, "Email must be less than 255 characters")
        .trim()
        .toLowerCase()
        .refine(noXSS, "Invalid characters detected"),

    subject: z.enum(
        ["general", "booking", "partnership", "support", "other"]
    ),

    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(2000, "Message must be less than 2000 characters")
        .trim()
        .refine(noXSS, "Invalid characters detected")
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ===== NEWSLETTER SCHEMA =====
export const newsletterSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address")
        .max(255, "Email must be less than 255 characters")
        .trim()
        .toLowerCase()
        .refine(noXSS, "Invalid characters detected")
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

// ===== SEARCH FORM SCHEMA =====
export const searchSchema = z.object({
    query: z
        .string()
        .max(200, "Search query must be less than 200 characters")
        .trim()
        .refine(noXSS, "Invalid search query")
        .refine(noHTMLTags, "HTML tags are not allowed in search"),

    dates: z
        .string()
        .max(50, "Date string too long")
        .optional()
        .refine(
            (val) => !val || /^[\d\s\-\/,.]*$/.test(val),
            "Invalid date format"
        ),

    guests: z
        .string()
        .optional()
        .refine(
            (val) => !val || /^\d+$/.test(val),
            "Guests must be a number"
        )
        .transform((val) => val ? parseInt(val, 10) : undefined)
        .refine(
            (val) => val === undefined || (val >= 1 && val <= 50),
            "Guests must be between 1 and 50"
        )
});

export type SearchFormData = z.infer<typeof searchSchema>;

// =====  HELPER: Safe Parse with Error Formatting =====
export function safeValidate<T>(
    schema: z.ZodSchema<T>,
    data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
    const result = schema.safeParse(data);

    if (result.success) {
        return { success: true, data: result.data };
    }

    // Format Zod errors into field-specific messages
    const errors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        errors[field] = err.message;
    });

    return { success: false, errors };
}
