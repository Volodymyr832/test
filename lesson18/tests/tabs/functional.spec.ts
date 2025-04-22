import { test, expect } from '@playwright/test';
import { TabsPage } from './tabs.page';
import { openStory } from '../../utils/storybook';
import { storyPaths } from '../../utils/storyPaths';
import KeyboardNavigator from '../../utils/KeyboardNavigatorHelper';

test.describe('Tabs Functional Tests', () => {
  let tabs: TabsPage;
  let keyboard: KeyboardNavigator;

  test.beforeEach(async ({ page }) => {
    const loadedPage = await openStory(page, storyPaths.tabs.default);
    tabs = new TabsPage(loadedPage);

    const frame =
      (await loadedPage.frame({ name: 'storybook-preview-iframe' })) || loadedPage.frames()[1];
    keyboard = new KeyboardNavigator(frame.page());

    await tabs.waitForReady();
  });

  test('DS-578 | should select second tab on click', async () => {
    const secondTab = tabs.tabButtons.nth(1);

    await secondTab.click();

    const selectedAttr = await secondTab.getAttribute('aria-selected');
    expect(selectedAttr).toBe('true');

    const allTabAttrs = await tabs.getAllTabAttributes();

    allTabAttrs.forEach((attr, index) => {
      if (index === 1) {
        expect(attr.selected).toBe('true');
      } else {
        expect(attr.selected).toBe('false');
      }
    });
  });

  test('DS-578 | should activate second tab via direct focus and Enter key', async () => {
    const targetTabIndex = 1;
    const targetTab = tabs.tabButtons.nth(targetTabIndex);

    const tabCount = await tabs.getTabCount();
    expect(tabCount).toBeGreaterThan(targetTabIndex);

    await targetTab.focus();
    await tabs.page.waitForTimeout(2000);

    await tabs.page.keyboard.press('Enter');
    await tabs.page.waitForTimeout(2000);

    const isSelected = await targetTab.getAttribute('aria-selected');
    expect(isSelected).toBe('true');
  });

  test('DS-578 | should display all tabs', async () => {
    const count = await tabs.getTabCount();
    expect(count).toBeGreaterThan(0);
  });

  test('DS-578 | should validate tab attributes', async () => {
    const attributes = await tabs.getAllTabAttributes();
    expect(attributes.length).toBeGreaterThan(0);

    for (const attr of attributes) {
      expect(attr).toHaveProperty('role');
      expect(attr).toHaveProperty('selected');
      expect(attr).toHaveProperty('disabled');
    }
  });
});
