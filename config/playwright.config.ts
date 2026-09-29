import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Configuração E2E do portal Hiperativo.
 * Usa API e PostgreSQL reais; grava vídeo, trace e screenshots de cada execução.
 */
export default defineConfig({
  testDir: resolve(projectRoot, 'e2e'),
  testMatch: /.*\.spec\.ts/,
  outputDir: resolve(projectRoot, 'e2e-results'),
  globalSetup: resolve(projectRoot, 'e2e/global-setup.ts'),
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  timeout: 120_000,
  reporter: [
    ['list'],
    ['html', { outputFolder: resolve(projectRoot, 'playwright-report'), open: 'never' }],
  ],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on',
    video: 'on',
    screenshot: 'on',
    actionTimeout: 15_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'npm run api:dev',
      url: 'http://localhost:3001/api/health',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      cwd: projectRoot,
    },
    {
      command: 'npm run dev',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      cwd: projectRoot,
    },
  ],
});
