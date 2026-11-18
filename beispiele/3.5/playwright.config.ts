import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Hier liegen die E2E-Tests
  testDir: './tests',
  use: {
    // page.goto('/departures') öffnet http://localhost:3000/departures
    baseURL: 'http://localhost:3000',
  },
  // Startet vor den Tests den Next.js-Server (oder nutzt einen laufenden)
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
  },
  // Vorerst nur in Chromium testen
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
