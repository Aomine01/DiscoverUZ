import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Security Tests
 * Load environment variables from .env.local for testing
 */
export default defineConfig({
    testDir: './tests',

    /* Global timeout increased to 60s for slow CI runners */
    timeout: 60 * 1000,

    /* Run tests in files in parallel */
    fullyParallel: true,

    /* Fail the build on CI if you accidentally left test.only in the source code */
    forbidOnly: !!process.env.CI,

    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,

    /* Opt out of parallel tests on CI */
    workers: process.env.CI ? 1 : undefined,

    /* Reporter to use */
    reporter: [
        ['html'],
        ['list'],
        ['json', { outputFile: 'test-results/results.json' }]
    ],

    /* Shared settings for all the projects below */
    use: {
        /* Base URL to use in actions like `await page.goto('/')` */
        baseURL: 'http://localhost:3000',

        /* Collect trace when retrying the failed test */
        trace: 'on-first-retry',

        /* Screenshot on failure */
        screenshot: 'only-on-failure',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],

    /* 
     * CRITICAL CI FIX: Auto-start dev server before tests
     * - Loads .env.local for environment variables
     * - Checks if port 3000 is already in use (reuses if available)
     * - Starts dev server automatically if not running
     * - Waits for server to be ready before running tests
     */
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI, // Reuse local dev server, start fresh in CI
        timeout: 120 * 1000, // 2 minutes for server startup (CI can be slow)
        stdout: 'ignore',
        stderr: 'pipe',
        env: {
            // Explicitly load environment variables from .env.local
            ...require('dotenv').config({ path: '.env.local' }).parsed,
        },
    },
});
