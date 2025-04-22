import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

export { page };

import { BeforeAll, AfterAll } from '@cucumber/cucumber';

BeforeAll(async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
});

AfterAll(async () => {
  await page.close();
  await context.close();
  await browser.close();
});
