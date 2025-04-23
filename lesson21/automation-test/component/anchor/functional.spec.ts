import {test, expect} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';
import {AnchorPage} from './anchor.page';

test.describe('Anchor Functional Tests', () => {
  test.describe('Default', () => {
    let anchor: AnchorPage;

    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.anchor.default);
      anchor = new AnchorPage(loadedPage);
      await anchor.waitForReady();
    });

    test('DS-800 | should render header and multiple links', async () => {
      const header = await anchor.getHeaderText();
      expect(header?.length).toBeGreaterThan(0);

      const count = await anchor.getLinkCount();
      expect(count).toBeGreaterThan(0);

      const text = await anchor.getLinkText(0);
      expect(text?.length).toBeGreaterThan(0);
    });

    test('DS-800 | should contain href for each link', async () => {
      const count = await anchor.getLinkCount();
      for (let i = 0; i < count; i++) {
        const href = await anchor.getLinkHref(i);
        expect(href).not.toBeNull();
      }
    });

    test('DS-800 | should focus by clicking tab', async () => {
      const frame = anchor.page.frameLocator('iframe');
      const firstLink = frame.locator('a.anchor-menu__item').first();
      const secondLink = frame.locator('a.anchor-menu__item').nth(1);

      await firstLink.focus();
      await anchor.page.waitForTimeout(500);

      await anchor.page.keyboard.press('Tab');
      await anchor.page.waitForTimeout(500);

      await expect(secondLink).toBeFocused();
    });
  });
});
