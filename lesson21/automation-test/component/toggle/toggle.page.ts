import {expect, Locator, Page, Frame, ElementHandle} from '@playwright/test';

export class TogglePage {
  readonly page: Page;
  readonly frameLocator: Locator;
  frame: Frame | null = null;

  readonly toggleHostLocator: Locator;
  readonly toggleInputLocator: Locator;

  constructor(public readonly pageContext: Page) {
    this.page = pageContext;
    this.frameLocator = pageContext.frameLocator('iframe');
    this.toggleHostLocator = this.frameLocator.locator('igds-toggle').first();
    this.toggleInputLocator = this.toggleHostLocator.locator(
      '>>> input[type="checkbox"]'
    );
  }

  async initFrame() {
    const iframeElement = await this.page.locator('iframe').elementHandle();
    this.frame = await iframeElement?.contentFrame();
    if (!this.frame) throw new Error('iframe not found');
  }

  async waitForReady() {
    await this.initFrame();
    await expect(this.toggleHostLocator).toBeVisible();
  }

  async clickToggle() {
    if (!this.frame) await this.initFrame();

    const toggleHostHandle = await this.frame!.waitForSelector('igds-toggle');
    const labelHandle = await toggleHostHandle.evaluateHandle(
      (host: HTMLElement) =>
        host.shadowRoot?.querySelector('label.switch') as HTMLElement
    );

    const label = labelHandle.asElement();
    if (!label) throw new Error('Label element not found');
    await label.click();
  }

  async isChecked(): Promise<boolean> {
    if (!this.frame) await this.initFrame();

    const toggleHostHandle = await this.frame!.waitForSelector('igds-toggle');
    const checkboxHandle = await toggleHostHandle.evaluateHandle(
      (host: HTMLElement) =>
        host.shadowRoot?.querySelector(
          'input[type="checkbox"]'
        ) as HTMLInputElement
    );

    return checkboxHandle.evaluate((input: HTMLInputElement) => input.checked);
  }

  async assertChecked(expected: boolean) {
    const actual = await this.isChecked();
    expect(actual).toBe(expected);
  }

  async assertAriaAttributes(expectedValue: string) {
    if (!this.frame) await this.initFrame();

    const toggleHostHandle = await this.frame!.waitForSelector('igds-toggle');
    const ariaChecked = await toggleHostHandle.evaluate((host: HTMLElement) => {
      const checkbox = host.shadowRoot?.querySelector('input[type="checkbox"]');
      return checkbox?.getAttribute('aria-checked');
    });

    expect(ariaChecked).toBe(expectedValue);
  }

  async assertDisabled(expected: boolean) {
    if (!this.frame) await this.initFrame();

    const toggleHostHandle = await this.frame!.waitForSelector('igds-toggle');
    const checkboxDisabled = await toggleHostHandle.evaluate(
      (host: HTMLElement) => {
        const checkbox = host.shadowRoot?.querySelector(
          'input[type="checkbox"]'
        ) as HTMLInputElement;
        return checkbox?.disabled;
      }
    );

    expect(checkboxDisabled).toBe(expected);
  }

  async assertDirection(expected: string) {
    if (!this.frame) await this.initFrame();

    const toggleHostHandle = await this.frame!.waitForSelector('igds-toggle');
    const dir = await toggleHostHandle.evaluate((host: HTMLElement) => {
      return (
        host.getAttribute('dir') || window.getComputedStyle(host).direction
      );
    });

    expect(dir).toBe(expected);
  }
}
