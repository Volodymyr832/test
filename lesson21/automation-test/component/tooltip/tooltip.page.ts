import {expect, Locator, Page, Frame, ElementHandle} from '@playwright/test';

export class TooltipPage {
  readonly page: Page;
  readonly frameLocator: Locator;
  frame: Frame | null = null;

  readonly tooltipHostLocator: Locator;
  readonly tooltipTrigger: Locator;

  constructor(public readonly pageContext: Page) {
    this.page = pageContext;
    this.frameLocator = pageContext.frameLocator('iframe');
    this.tooltipHostLocator = this.frameLocator.locator('igds-tooltip').first();
    this.tooltipTrigger = this.tooltipHostLocator.locator('igds-button');
  }

  async initFrame() {
    const iframeElement = await this.page.locator('iframe').elementHandle();
    this.frame = await iframeElement?.contentFrame();
    if (!this.frame) throw new Error('iframe not found');
  }

  async waitForReady() {
    await this.initFrame();
    await expect(this.tooltipHostLocator).toBeVisible();
    await expect(this.tooltipTrigger).toBeVisible();
  }

  async hoverOnTrigger() {
    await this.tooltipTrigger.hover();
    if (!this.frame) await this.initFrame();

    const tooltipHostHandle = await this.frame!.waitForSelector('igds-tooltip');
    const tooltipBodyHandle = await tooltipHostHandle.evaluateHandle(
      (host: HTMLElement) =>
        host.shadowRoot?.getElementById('tooltip-text') as HTMLElement
    );

    const box = await tooltipBodyHandle.boundingBox();
    expect(box).not.toBeNull();
  }

  async assertTooltipVisible() {
    if (!this.frame) await this.initFrame();

    const tooltipHostHandle = await this.frame!.waitForSelector('igds-tooltip');
    const tooltipBodyHandle = await tooltipHostHandle.evaluateHandle(
      (host: HTMLElement) =>
        host.shadowRoot?.getElementById('tooltip-text') as HTMLElement
    );

    const box = await tooltipBodyHandle.boundingBox();
    expect(box).not.toBeNull();
  }

  async assertTooltipHasText(expectedText: string) {
    if (!this.frame) await this.initFrame();

    const tooltipHostHandle = await this.frame!.waitForSelector('igds-tooltip');
    const tooltipBodyText = await tooltipHostHandle.evaluate(
      (host: HTMLElement) =>
        host.shadowRoot?.getElementById('tooltip-text')?.innerText
    );

    expect(tooltipBodyText).toContain(expectedText);
  }

  async assertAriaAttributes() {
    if (!this.frame) await this.initFrame();

    const tooltipHostHandle = await this.frame!.waitForSelector('igds-tooltip');
    const ariaAttributes = await tooltipHostHandle.evaluate(
      (host: HTMLElement) => {
        const tooltipContainer = host.shadowRoot?.querySelector(
          'div[role="tooltip"]'
        );
        return {
          role: tooltipContainer?.getAttribute('role'),
          ariaLive: tooltipContainer?.getAttribute('aria-live'),
        };
      }
    );

    expect(ariaAttributes.role).toBe('tooltip');
    expect(ariaAttributes.ariaLive).toBe('polite');
  }
}
