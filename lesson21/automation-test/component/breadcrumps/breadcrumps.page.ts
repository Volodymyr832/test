import {Locator, Page, expect} from '@playwright/test';

export class BreadcrumbsPage {
  readonly page: Page;
  readonly frameLocator: Locator;
  readonly component: Locator;
  readonly items: Locator;
  readonly separator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frameLocator = page.frameLocator('iframe');
    this.component = this.frameLocator.locator('igds-breadcrumbs');
    this.items = this.component.locator('igds-breadcrumb-item');
    this.separator = this.component.locator('igds-icon.breadcrumbs__separator');
  }

  async waitForReady(): Promise<void> {
    await expect(this.component).toBeVisible();
    await expect(this.items.first()).toBeVisible();
  }

  async getItemCount(): Promise<number> {
    return await this.items.count();
  }

  async getItemText(index: number): Promise<string | null> {
    return await this.items.nth(index).textContent();
  }

  async getSeparatorCount(): Promise<number> {
    return await this.separator.count();
  }

  async getItemTabIndex(index: number): Promise<string | null> {
    return this.items.nth(index).getAttribute('tabindex');
  }

  async getLastItemText(): Promise<string | null> {
    const count = await this.getItemCount();
    return this.getItemText(count - 1);
  }

  async getLastItemTabIndex(): Promise<string | null> {
    const count = await this.getItemCount();
    return this.getItemTabIndex(count - 1);
  }

  getLink(index: number): Locator {
    return this.items.nth(index).locator('a');
  }

  getLinkAriaCurrent(index: number): Promise<string | null> {
    return this.getLink(index).getAttribute('aria-current');
  }

  getLinkTabIndex(index: number): Promise<string | null> {
    return this.getLink(index).getAttribute('tabindex');
  }
}
