import {Locator, Page, expect} from '@playwright/test';

export class ButtonPage {
  readonly page: Page;
  readonly frameLocator: Locator;
  readonly buttons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frameLocator = page.frameLocator('iframe');
    this.buttons = this.frameLocator.locator('igds-button');
  }

  async waitForReady(): Promise<void> {
    await expect(this.buttons.first()).toBeVisible();
  }

  async getButtonCount(): Promise<number> {
    return await this.buttons.count();
  }

  async getButtonText(index: number): Promise<string | null> {
    return this.buttons.nth(index).textContent();
  }

  async getRole(index: number): Promise<string | null> {
    return this.buttons.nth(index).getAttribute('role');
  }

  async getAriaLabel(index: number): Promise<string | null> {
    return this.buttons.nth(index).getAttribute('aria-label');
  }

  getNativeButton(index: number): Locator {
    return this.buttons.nth(index).locator('button');
  }

  async isButtonDisabled(index: number): Promise<boolean> {
    return (await this.buttons.nth(index).getAttribute('disabled')) !== null;
  }

  async isButtonLoading(index: number): Promise<boolean> {
    return (await this.buttons.nth(index).getAttribute('loading')) !== null;
  }

  getButtonIcon(index: number): Locator {
    return this.getNativeButton(index).locator('slot[name="icon"]');
  }

  async isInlineButton(index: number): Promise<boolean> {
    const variant = await this.buttons.nth(index).getAttribute('variant');
    return variant === 'link-inline';
  }
}
