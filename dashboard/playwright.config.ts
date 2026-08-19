// @ts-ignore: suppress missing module/type errors in environments without Playwright installed
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4173',
    headless: true,
  },
  webServer: {
    command: 'npm run preview',
    port: 4173,
    timeout: 60_000,
    // ensure a boolean value for reuseExistingServer (CI env vars are strings)
    reuseExistingServer: Boolean(
      (globalThis as typeof globalThis & { process?: { env?: { CI?: string } } }).process?.env?.CI,
    )
      ? false
      : true,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
});
