import {Locator, Page, expect} from '@playwright/test';

export class AnchorPage {
  readonly page: Page;
  readonly frameLocator: Locator;
  readonly menu: Locator;
  readonly header: Locator;
  readonly links: Locator;
  readonly nav: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frameLocator = page.frameLocator('iframe');
    this.menu = this.frameLocator.locator('igds-anchor-menu');
    this.header = this.menu.locator('h2.anchor-menu__header');
    this.links = this.menu.locator('a.anchor-menu__item');
    this.nav = this.menu.locator('nav.anchor-menu');
  }

  async waitForReady(): Promise<void> {
    await expect(this.menu).toBeVisible();
    await expect(this.header).toBeVisible();
    await expect(this.links.first()).toBeVisible();
  }

  async getHeaderText(): Promise<string> {
    return this.header.textContent();
  }

  async getLinkCount(): Promise<number> {
    return await this.links.count();
  }

  async getLinkHref(index: number): Promise<string | null> {
    return await this.links.nth(index).getAttribute('href');
  }

  async getLinkText(index: number): Promise<string | null> {
    return await this.links.nth(index).textContent();
  }

  async getLinkRole(index: number): Promise<string | null> {
    return await this.links.nth(index).getAttribute('role');
  }

  async getNavRole(): Promise<string | null> {
    return await this.nav.getAttribute('role');
  }
}
