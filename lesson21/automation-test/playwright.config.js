import {defineConfig} from '@playwright/test';
import xrayConfig from './xray.config';

export default defineConfig({
  timeout: 30 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  use: {
    headless: false,
    baseURL: 'http://localhost:6008',
    viewport: {width: 1280, height: 720},
    trace: 'on-first-retry',
    actionTimeout: 10 * 1000,
    screenshot: 'only-on-failure',
  },
  outputDir: 'test-results/',
  projects: [
    {
      name: 'chromium',
      use: {browserName: 'chromium'},
    },
  ],
  reporter: [
    ['list'],
    ['html', {outputFolder: 'playwright-report'}],
    ['playwright-xray', xrayConfig],
  ],
  workers: 3,
});
