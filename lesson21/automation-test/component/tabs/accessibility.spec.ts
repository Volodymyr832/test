import {test, expect} from '@playwright/test';
import {TabsPage} from './tabs.page';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';

test.describe('Tabs Accessibility', () => {
  let tabs: TabsPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.tabs.default);
    tabs = new TabsPage(loadedPage);
    await tabs.waitForReady();
  });

  test('DS-580 | should log tab roles', async () => {
    const count = await tabs.getTabCount();
    const roles = [];

    for (let i = 0; i < count; i++) {
      const role = await tabs.getTabRole(i);
      roles.push(role);
    }

    console.log('[roles snapshot]', roles);
    expect(roles.every((r) => r === 'tab')).toBeTruthy();
  });
});
