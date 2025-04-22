import {Page, Locator, FrameLocator, expect} from '@playwright/test';

export class AccordionPage {
  readonly page: Page;
  readonly frame: FrameLocator;
  readonly headers: Locator;
  readonly panels: Locator;

  constructor(page: Page) {
    this.page = page;

    this.frame = page.frameLocator('iframe');

    this.headers = this.frame.locator('summary.accordion-item__header');
    this.panels = this.frame.locator('div.accordion-item__content');
  }

  async waitForReady() {
    const count = await this.headers.count();
    expect(count).toBeGreaterThan(0);
    await expect(this.headers.first()).toBeVisible({timeout: 10000});
  }

  async expandItem(index: number) {
    const count = await this.headers.count();
    if (index >= count) {
      throw new Error(
        `Accordion item index ${index} doesn't exist. Found only ${count} item(s).`
      );
    }

    const item = this.headers.nth(index);

    await expect(item).toBeVisible({timeout: 5000});
    await item.click();
  }

  async assertPanelVisible(index: number) {
    await expect(this.panels.nth(index)).toBeVisible();
  }

  async assertPanelHidden(index: number) {
    await expect(this.panels.nth(index)).toBeHidden();
  }

  async assertItemDisabled(index: number) {
    const itemComponent = this.frame.locator('igds-accordion-item').nth(index);
    await expect(itemComponent).toHaveAttribute('disabled', '');
  }

  async assertItemHasIcon(index: number, iconName = 'help-outlined') {
    const item = this.headers.nth(index);

    const icon = item.locator(
      `igds-icon.accordion-item__icon[name="${iconName}"]`
    );

    await expect(icon).toBeVisible();
  }

  async assertLtrLayout(index: number) {
    const item = this.headers.nth(index);
    const dir = await item.getAttribute('dir');
    expect(dir === 'ltr' || dir === null).toBeTruthy();
  }

  async snapshot(name: string) {
    const screenshot = await this.frame.locator('body').screenshot();
    expect(screenshot).toMatchSnapshot(name);
  }

  async tryExpandDisabledItem(index: number) {
    const summary = this.frame
      .locator('igds-accordion-item')
      .nth(index)
      .locator('summary');
    await summary.click();
  }
}
