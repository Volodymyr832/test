import {Page, Locator, FrameLocator} from '@playwright/test';

export class BadgePage {
  readonly page: Page;
  readonly frame: FrameLocator;

  readonly regularBadges: Locator;
  readonly numericBadges: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frame = page.frameLocator('iframe');

    this.regularBadges = this.frame.locator('igds-badge:not([counter])');
    this.numericBadges = this.frame.locator('igds-badge[counter]');
  }

  regularBadgeWrapper(index = 0): Locator {
    return this.regularBadges.nth(index).getByRole('status');
  }

  regularBadgeText(index = 0): Locator {
    return this.regularBadges
      .nth(index)
      .getByRole('status')
      .locator('span.badge__text');
  }

  numericBadgeWrapper(index = 0): Locator {
    return this.numericBadges.nth(index).locator(':scope >>> span.badge');
  }

  numericBadgeText(index = 0): Locator {
    return this.numericBadges.nth(index).locator(':scope >>> span.badge');
  }

  async getBadgeText(index = 0): Promise<string> {
    return (await this.regularBadgeText(index).textContent()) || '';
  }

  async getNumericBadgeCount(index = 0): Promise<string> {
    const text = await this.numericBadgeText(index).innerText();
    return text.trim();
  }

  async waitForReady(): Promise<void> {
    await this.frame.locator('igds-badge').first().waitFor({state: 'visible'});
  }
}
