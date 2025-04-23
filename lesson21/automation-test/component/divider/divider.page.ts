import {expect, Locator, Page} from '@playwright/test';

export class DividerPage {
  readonly divider: Locator;

  constructor(public readonly page: Page) {
    this.divider = page.frameLocator('iframe').locator('igds-divider').first();
  }

  async waitForReady() {
    await expect(this.divider).toBeVisible();
  }

  async assertOrientation(orientation: 'horizontal' | 'vertical') {
    await expect(this.divider).toHaveAttribute(
      'orientation',
      `igds-${orientation}-divider`
    );
  }

  async assertInset(isInset: boolean = true) {
    const expectedWidth = isInset ? 'igds-inset-divider' : 'igds-full-divider';
    await expect(this.divider).toHaveAttribute('width', expectedWidth);
  }

  async assertInverted(isInverted: boolean = true) {
    if (isInverted) {
      await expect(this.divider).toHaveAttribute('inverted', '');
    } else {
      await expect(this.divider).not.toHaveAttribute('inverted', '');
    }
  }
}
