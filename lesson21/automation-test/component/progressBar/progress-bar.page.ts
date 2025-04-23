import {expect, Locator, Page, Frame, ElementHandle} from '@playwright/test';

export class ProgressBarPage {
  readonly page: Page;
  readonly frameLocator: Locator;
  frame: Frame | null = null;

  readonly progressHostLocator: Locator;

  constructor(public readonly pageContext: Page) {
    this.page = pageContext;
    this.frameLocator = pageContext.frameLocator('iframe');
    this.progressHostLocator = this.frameLocator
      .locator('igds-progress-bar')
      .first();
  }

  async initFrame() {
    const iframeElement = await this.page.locator('iframe').elementHandle();
    this.frame = await iframeElement?.contentFrame();
    if (!this.frame) throw new Error('iframe not found');
  }

  async waitForReady() {
    await this.initFrame();
    await expect(this.progressHostLocator).toBeVisible();
  }

  async getProgressValue(): Promise<number> {
    if (!this.frame) await this.initFrame();

    const hostHandle = await this.frame!.waitForSelector('igds-progress-bar');
    const value = await hostHandle.evaluate((host: Element) => {
      const progressBarTrack = (
        host.shadowRoot as ShadowRoot | null
      )?.querySelector('.progress-bar__track');
      return progressBarTrack?.getAttribute('aria-valuenow');
    });

    return Number(value);
  }

  async assertProgressValue(expectedValue: number) {
    const actualValue = await this.getProgressValue();
    expect(actualValue).toBe(expectedValue);
  }

  async assertSpinnerVisible() {
    if (!this.frame) await this.initFrame();

    const hostHandle = await this.frame!.waitForSelector('igds-progress-bar');
    const spinnerHandle = await hostHandle.evaluateHandle((host: Element) =>
      (host.shadowRoot as ShadowRoot | null)?.querySelector('svg.spinner')
    );

    const spinnerElement = spinnerHandle.asElement();
    expect(spinnerElement).not.toBeNull();
    expect(await spinnerElement?.isVisible()).toBe(true);
  }

  async assertAriaAttributes(
    expectedMin: string,
    expectedMax: string,
    expectedNow?: string
  ) {
    if (!this.frame) await this.initFrame();

    const hostHandle = await this.frame!.waitForSelector('igds-progress-bar');
    const ariaAttributes = await hostHandle.evaluate((host: Element) => {
      const track = (host.shadowRoot as ShadowRoot | null)?.querySelector(
        '.progress-bar__track'
      );
      return {
        ariaMin: track?.getAttribute('aria-valuemin'),
        ariaMax: track?.getAttribute('aria-valuemax'),
        ariaNow: track?.getAttribute('aria-valuenow'),
      };
    });

    expect(ariaAttributes.ariaMin).toBe(expectedMin);
    expect(ariaAttributes.ariaMax).toBe(expectedMax);

    if (expectedNow !== undefined) {
      expect(ariaAttributes.ariaNow).toBe(expectedNow);
    }
  }
}
