import {test, expect} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';
import {AnchorPage} from './anchor.page';

test.describe('Anchor Accessibility', () => {
  test.describe('Default', () => {
    let anchor: AnchorPage;

    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.anchor.default);
      anchor = new AnchorPage(loadedPage);
      await anchor.waitForReady();
    });

    test('DS-802 | should have role attribute on all links', async () => {
      const count = await anchor.getLinkCount();
      for (let i = 0; i < count; i++) {
        const role = await anchor.getLinkRole(i);
        expect(role).not.toBeUndefined();
      }
    });

    test('DS-802 | should have nav element with role navigation', async () => {
      const navRole = await anchor.getNavRole();
      expect(navRole).toBe('navigation');
    });
  });
});
