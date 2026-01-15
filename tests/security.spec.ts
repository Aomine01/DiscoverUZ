import { test, expect } from "@playwright/test";

/**
 * Security Tests - XSS Prevention
 * 
 * Tests all user input fields for XSS vulnerability protection
 * Validates that malicious scripts are sanitized/blocked
 */

const XSS_PAYLOADS = [
    "<script>alert('XSS')</script>",
    "<img src=x onerror=alert('XSS')>",
    "javascript:alert('XSS')",
    "<iframe src='javascript:alert(\"XSS\")'></iframe>",
    "<svg onload=alert('XSS')>",
    "';alert(String.fromCharCode(88,83,83))//",
    "<body onload=alert('XSS')>",
];

test.describe("Contact Form - XSS Prevention", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:3000/contact");
    });

    test("should sanitize XSS in name field", async ({ page }) => {
        const nameInput = page.locator('input[type="text"]').first();

        for (const payload of XSS_PAYLOADS) {
            await nameInput.fill(payload);
            await nameInput.blur();

            // Check that no alert was triggered
            page.on("dialog", (dialog) => {
                expect(dialog.type()).not.toBe("alert");
                dialog.dismiss();
            });
        }
    });

    test("should block form submission with XSS in message", async ({ page }) => {
        await page.goto("http://localhost:3000/contact");

        // Bypass client-side sanitization by directly calling the API
        // This tests server-side XSS detection properly
        const response = await page.request.post('http://localhost:3000/api/contact', {
            data: {
                name: "John Doe Testing",
                email: "john@example.com",
                subject: "general",
                message: "This is a test message with <script>alert('XSS')</script> embedded content"
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Server should reject with 400 and field-specific error
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.fields?.message).toMatch(/Invalid characters detected/i);
    });

    test("should validate email format", async ({ page }) => {
        const emailInput = page.locator('input[type="email"]');

        const invalidEmails = ["notanemail", "test@", "@example.com", "test @example.com"];

        for (const email of invalidEmails) {
            // Fill required fields to isolate email validation
            await page.locator('input[type="text"]').first().fill("John Doe");
            await page.locator('select').selectOption("general");

            await emailInput.fill(email);
            await emailInput.blur();

            await page.locator('button[type="submit"]').click();

            // Should show validation error
            await expect(
                page.locator("text=/valid email|Invalid/i").first()
            ).toBeVisible({ timeout: 3000 });

            // Wait a bit to allow error message to appear
            await page.waitForTimeout(500);
        }
    });

    test("should enforce max length on message", async ({ page }) => {
        const longMessage = "a".repeat(2500); // Exceeds 2000 char limit

        await page.locator('textarea').fill(longMessage);
        await page.locator('button[type="submit"]').click();

        // Should show validation error
        await expect(
            page.locator("text=/less than 2000 characters/i")
        ).toBeVisible({ timeout: 3000 });
    });
});

test.describe("Search Box - Input Sanitization", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:3000");
    });

    test("should sanitize XSS in search input", async ({ page }) => {
        const searchInput = page.locator('input[placeholder*="Destinations"]');

        await searchInput.fill("<script>alert('XSS')</script>");
        await page.locator("button:has-text('Search')").click();

        // No alert should be triggered
        page.on("dialog", (dialog) => {
            expect(dialog.type()).not.toBe("alert");
            dialog.dismiss();
        });
    });

    test("should validate guests as number", async ({ page }) => {
        const guestsInput = page.locator('input[placeholder*="guests"]');

        // Verify the input is type="number" (security measure)
        const inputType = await guestsInput.getAttribute('type');
        expect(inputType).toBe('number');

        // Test that valid numeric input works
        await guestsInput.fill("5");
        const validValue = await guestsInput.inputValue();
        expect(validValue).toBe("5");

        // Verify input has min/max constraints (security)
        const minValue = await guestsInput.getAttribute('min');
        const maxValue = await guestsInput.getAttribute('max');
        expect(parseInt(minValue || '0')).toBeGreaterThanOrEqual(1);
        expect(parseInt(maxValue || '999')).toBeLessThanOrEqual(20);
    });
});

test.describe("Newsletter Form - Email Validation", () => {
    test("should validate newsletter email on For Tourists page", async ({ page }) => {
        await page.goto("http://localhost:3000/for-tourists");

        // Scroll to newsletter section
        await page.locator('input[type="email"]').last().scrollIntoViewIfNeeded();

        const newsletterInput = page.locator('input[type="email"]').last();
        await newsletterInput.fill("invalid-email");

        // Try to submit
        const submitButton = page.locator('button:has-text("Subscribe")').last();
        await submitButton.click();

        // Should show validation error
        await expect(
            page.locator("text=/valid email|Invalid/i")
        ).toBeVisible({ timeout: 3000 });
    });
});

test.describe("Security Headers", () => {
    test("should have correct security headers", async ({ page }) => {
        const response = await page.goto("http://localhost:3000");

        if (response) {
            const headers = response.headers();

            // Check for HSTS
            expect(headers["strict-transport-security"]).toBeTruthy();
            expect(headers["strict-transport-security"]).toContain("max-age");

            // Check X-Frame-Options
            expect(headers["x-frame-options"]).toBeTruthy();

            // Check X-Content-Type-Options
            expect(headers["x-content-type-options"]).toBe("nosniff");

            // Check CSP exists
            expect(headers["content-security-policy"]).toBeTruthy();
        }
    });
});

test.describe("Rate Limiting", () => {
    test("should prevent rapid form submissions", async ({ page }) => {
        await page.goto("http://localhost:3000/contact");

        // Valid form data for rapid submission
        const formData = {
            name: "Test User Name",
            email: "sameuser@example.com", // Same email for consistent composite key
            subject: "general",
            message: "This is a valid long message that definitely passes the minimum ten character validation requirement."
        };

        // Make 10 rapid API calls to trigger rate limiting
        const requests = [];
        for (let i = 0; i < 10; i++) {
            requests.push(
                page.request.post('http://localhost:3000/api/contact', {
                    data: formData,
                    headers: { 'Content-Type': 'application/json' }
                })
            );
        }

        // Wait for all requests to complete
        const responses = await Promise.all(requests);

        // Check that at least one request was rate limited (429)
        const rateLimited = responses.some(r => r.status() === 429);
        expect(rateLimited).toBe(true);

        // Verify the rate limited response has proper error message
        const rateLimitedResponse = responses.find(r => r.status() === 429);
        if (rateLimitedResponse) {
            const body = await rateLimitedResponse.json();
            expect(body.error).toMatch(/too many|wait/i);
        }
    });
});
