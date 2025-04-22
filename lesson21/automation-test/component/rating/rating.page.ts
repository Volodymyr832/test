import {Locator, Page, expect} from '@playwright/test';

export class RatingPage {
  readonly page: Page;
  readonly frameLocator: Locator;
  readonly component: Locator;
  readonly stars: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frameLocator = page.frameLocator('iframe');
    this.component = this.frameLocator.locator('igds-rating');
    this.stars = this.component.locator('button[role="radio"]');
  }

  async waitForReady(): Promise<void> {
    await expect(this.component).toBeVisible();
    await expect(this.stars.first()).toBeVisible();
  }

  async getStarCount(): Promise<number> {
    return this.stars.count();
  }

  async isStarChecked(index: number): Promise<boolean> {
    return (
      (await this.stars.nth(index).getAttribute('aria-checked')) === 'true'
    );
  }

  async getStarLabel(index: number): Promise<string | null> {
    return this.stars.nth(index).getAttribute('aria-label');
  }

  async selectStar(index: number): Promise<void> {
    await this.stars.nth(index).click();
  }
}
