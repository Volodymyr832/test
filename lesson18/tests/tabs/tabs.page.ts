import { Locator, Page } from '@playwright/test';

export class TabsPage {
  readonly page: Page;
  readonly frameLocator: Locator;
  readonly shadowTabs: Locator;
  readonly tabButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frameLocator = page.frameLocator('iframe');

    this.shadowTabs = this.frameLocator.locator('igds-tabs');
    this.tabButtons = this.shadowTabs.locator('button[role="tab"]');
  }

  async waitForReady(): Promise<void> {
    await this.frameLocator.locator('[role="tablist"]').scrollIntoViewIfNeeded();
    await this.tabButtons.first().waitFor({ state: 'visible' });
  }

  async getTabCount(): Promise<number> {
    return await this.tabButtons.count();
  }

  async getAllTabAttributes(): Promise<Record<string, string | null>[]> {
    const count = await this.getTabCount();
    const results: Record<string, string | null>[] = [];

    for (let i = 0; i < count; i++) {
      const tab = this.tabButtons.nth(i);
      const attrs = {
        role: await tab.getAttribute('role'),
        disabled: await tab.getAttribute('disabled'),
        selected: await tab.getAttribute('aria-selected'),
      };

      console.log(`[getAllTabAttributes] Tab #${i} →`, attrs);
      results.push(attrs);
    }

    return results;
  }

  async getTabRole(index: number): Promise<string | null> {
    const tab = this.tabButtons.nth(index);
    return await tab.getAttribute('role');
  }
}
