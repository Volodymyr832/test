import {expect, Page, Locator} from '@playwright/test';

export class TextareaPage {
  readonly page: Page;
  readonly frameLocator: Locator;
  readonly textareaLocator: Locator;
  readonly disabledToggle: Locator;
  readonly invalidToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frameLocator = page.frameLocator('iframe');
    this.textareaLocator = this.frameLocator.locator(
      'textarea.input__field-box'
    );
    this.disabledToggle = page.locator(
      'label:has-text("disabled") >> input[type="checkbox"]'
    );
    this.invalidToggle = page.locator(
      'label:has-text("invalid") >> input[type="checkbox"]'
    );
  }

  async typeText(text: string): Promise<void> {
    await expect(this.textareaLocator).toBeVisible();
    await this.textareaLocator.fill('');
    await this.textareaLocator.type(text);
  }

  async getTextareaValue(): Promise<string> {
    return await this.textareaLocator.inputValue();
  }

  async setDisabled(state: boolean): Promise<void> {
    const checked = await this.disabledToggle.isChecked();
    if (checked !== state) await this.disabledToggle.check({force: true});
  }

  async setInvalid(state: boolean): Promise<void> {
    const checked = await this.invalidToggle.isChecked();
    if (checked !== state) await this.invalidToggle.check({force: true});
  }

  async isDisabled(): Promise<boolean> {
    return await this.textareaLocator.isDisabled();
  }

  async hasInvalidAttribute(): Promise<boolean> {
    return (await this.textareaLocator.getAttribute('aria-invalid')) === 'true';
  }

  async getDirAttribute(): Promise<string | null> {
    const textarea = this.textareaLocator;
    const dir = await textarea.getAttribute('dir');

    if (!dir) {
      const computedDir = await textarea.evaluate(
        (el) => window.getComputedStyle(el).direction
      );
      console.log('[getDirAttribute] Computed direction:', computedDir);
      return computedDir;
    }

    return dir;
  }

  async getActiveTextareaTagNameFromShadowDom(): Promise<string | null> {
    const frameHandle = await this.page.locator('iframe').elementHandle();
    const frame = await frameHandle?.contentFrame();
    if (!frame) throw new Error('iframe not found');

    const tag = await frame.evaluate(() => {
      const activeEl = document.activeElement;
      if (!activeEl || !activeEl.shadowRoot) return activeEl?.tagName ?? null;
      const innerActive = activeEl.shadowRoot.activeElement;
      return innerActive?.tagName ?? activeEl.tagName;
    });

    console.log('[ShadowRoot focus check] tag:', tag);
    return tag;
  }
}
