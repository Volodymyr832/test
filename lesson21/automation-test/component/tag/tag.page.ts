import {expect, Locator, Page} from '@playwright/test';

export class TagGroupPage {
  readonly page: Page;
  readonly frameLocator: Locator;
  readonly tagGroup: Locator;
  readonly tags: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frameLocator = page.frameLocator('iframe');
    this.tagGroup = this.frameLocator.locator('igds-tag-group');
    this.tags = this.tagGroup.locator('igds-tag');
  }

  async waitForReady(): Promise<void> {
    await expect(this.tagGroup).toBeVisible();
    await expect(this.tags.first()).toBeVisible();
  }

  async getTagCount(): Promise<number> {
    return await this.tags.count();
  }

  async getAllTagAttributes(): Promise<Record<string, string | null>[]> {
    const count = await this.tags.count();
    const results: Record<string, string | null>[] = [];

    for (let i = 0; i < count; i++) {
      const tag = this.tags.nth(i);
      await expect(tag).toBeVisible();

      const attrs = {
        icon: await tag.getAttribute('icon'),
        removable: await tag.getAttribute('removable'),
        disabled: await tag.getAttribute('disabled'),
      };

      console.log(`[getAllTagAttributes] Tag #${i} →`, attrs);
      results.push(attrs);
    }

    return results;
  }

  async getTagRole(tagIndex: number): Promise<string | null> {
    const tagHandle = await this.tags.nth(tagIndex).elementHandle();
    if (!tagHandle) return null;

    return await tagHandle.evaluate((el) => {
      if (el.getAttribute('role')) return el.getAttribute('role');

      if (el.shadowRoot) {
        const rootTag = el.shadowRoot.querySelector('[role]');
        return rootTag?.getAttribute('role') || null;
      }

      return null;
    });
  }
}
