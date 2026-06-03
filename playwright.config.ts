import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "mobile-chrome",
      testIgnore: [/desktop-regression/, /safari-visual-parity/],
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "desktop-chrome",
      testIgnore: /safari-visual-parity/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "webkit-iphone",
      testMatch: /safari-visual-parity/,
      use: { ...devices["iPhone 13"] },
    },
  ],
  webServer: {
    command: process.env.PLAYWRIGHT_PRODUCTION ? "npm run start" : "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: process.env.PLAYWRIGHT_PRODUCTION ? 60_000 : 120_000,
  },
});
