import {Page} from '@playwright/test';

export const baseUrl = 'https://igds-storybook.globalbit.dev/develop/core-web';

export async function openStory(page: Page, storyPath: string): Promise<Page> {
  const url = `${baseUrl}/?path=/story/${storyPath}`;
  console.log(`Navigating to: ${url}`);
  await page.goto(url, {waitUntil: 'domcontentloaded'});

  await page.waitForTimeout(5000);
  const frame = page.frameLocator('iframe');
  await frame.locator('body').waitFor({state: 'attached', timeout: 150000});

  return page;
}
