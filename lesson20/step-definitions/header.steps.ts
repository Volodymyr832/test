import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from '../support/hooks';
import { HeaderPage } from '../page/header.page';

let headerPage: HeaderPage;

Given('I open the header storybook page', async () => {
  await page.goto('https://igds-storybook.globalbit.dev/develop/core-web/?path=/story/components-header--default-header');
  await page.waitForTimeout(3000); 
  headerPage = new HeaderPage(page);
});

Then('I should see the logo', async () => {
  await expect(headerPage.logo).toBeVisible();
});

When('I type {string} into the search input', async (text: string) => {
  await headerPage.searchInput.fill(text);
});

Then('I should see the clear button', async () => {
  await expect(headerPage.clearButton).toBeVisible();
});
