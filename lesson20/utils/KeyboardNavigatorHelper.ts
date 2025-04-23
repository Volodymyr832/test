import { Page } from '@playwright/test';

class KeyboardNavigator {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async tabUntilInsideTabs(maxTabs = 50): Promise<void> {
    let tabPresses = 0;

    while (tabPresses < maxTabs) {
      await this.page.keyboard.press('Tab');
      await this.page.waitForTimeout(300);
      tabPresses++;

      const focused = await this.page.evaluate(() => {
        const active = document.activeElement;
        return active ? active.outerHTML : '[null]';
      });

      console.log(`[Tab #${tabPresses}] Focused:\n${focused}`);

      const isInTabs = await this.page.evaluate(() => {
        return !!document.activeElement?.closest('igds-tabs');
      });

      if (isInTabs) {
        console.log(`✅ Focus is now inside <igds-tabs> after ${tabPresses} Tab(s)`);
        return;
      }
    }

    throw new Error(`❌ Focus did not reach <igds-tabs> after ${maxTabs} Tab presses.`);
  }
}

export default KeyboardNavigator;
