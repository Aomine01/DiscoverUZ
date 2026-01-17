import { defineConfig, devices } from "@playwright/test";
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file for testing
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Playwright Test Configuration
 * Security Testing Setup
 */
export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ["html"],
        ["list"],
        ["json", { outputFile: "test-results/results.json" }]
    ],
    use: {
        baseURL: "http://localhost:3000",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
    },

    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],

    // Run local dev server before tests
    webServer: {
        command: "npm run dev",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
        // Pass environment variables to the dev server
        env: process.env as { [key: string]: string },
    },
});
