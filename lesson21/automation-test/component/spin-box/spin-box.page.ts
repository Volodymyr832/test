import {Locator, Page, expect} from '@playwright/test';

export class SpinBoxPage {
  readonly page: Page;
  readonly frameLocator: Locator;
  readonly component: Locator;
  readonly input: Locator;
  readonly incrementButton: Locator;
  readonly decrementButton: Locator;
  readonly helpBox: Locator;
  readonly helpText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frameLocator = page.frameLocator('iframe');
    this.component = this.frameLocator.locator('igds-spinbox');
    this.input = this.component.locator('input[type="number"]');
    this.incrementButton = this.component.locator('igds-button').nth(0);
    this.decrementButton = this.component.locator('igds-button').nth(1);
    this.helpBox = this.component.locator('#spin-box-help-message');
    this.helpText = this.helpBox.locator('.spin-box__help-text');
  }

  async waitForReady(): Promise<void> {
    await expect(this.component).toBeVisible();
    await expect(this.input).toBeVisible();
  }

  async getValue(): Promise<string> {
    return await this.input.inputValue();
  }

  async increment(): Promise<void> {
    await this.incrementButton.click();
  }

  async decrement(): Promise<void> {
    await this.decrementButton.click();
  }

  async isDisabled(): Promise<boolean> {
    return await this.input.isDisabled();
  }

  async getAriaInvalid(): Promise<string | null> {
    return await this.input.getAttribute('aria-invalid');
  }

  async getDirection(): Promise<string> {
    return await this.input.evaluate((el) => getComputedStyle(el).direction);
  }

  async setValue(value: string): Promise<void> {
    await this.input.fill('');
    await this.input.type(value);
  }

  async hasHelpText(): Promise<boolean> {
    return await this.helpBox.isVisible();
  }

  async getHelpText(): Promise<string> {
    return await this.helpText.innerText();
  }
}
