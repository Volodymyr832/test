import {test, expect} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';
import {BreadcrumbsPage} from '../breadcrumps/breadcrumps.page';

test.describe('Breadcrumbs Functional Tests', () => {
  test.describe('Default', () => {
    let breadcrumbs: BreadcrumbsPage;

    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.breadcrumbs.default);
      breadcrumbs = new BreadcrumbsPage(loadedPage);
      await breadcrumbs.waitForReady();
    });

    test('DS-361 | should render breadcrumb items and separators', async () => {
      const itemCount = await breadcrumbs.getItemCount();
      const separatorCount = await breadcrumbs.getSeparatorCount();

      expect(itemCount).toBeGreaterThan(1);
      expect(separatorCount).toBe(itemCount - 1);
    });

    test('DS-XXX | should display non-empty text for each item', async () => {
      const count = await breadcrumbs.getItemCount();
      for (let i = 0; i < count; i++) {
        const text = await breadcrumbs.getItemText(i);
        expect((text ?? '').trim().length).toBeGreaterThan(0);
      }
    });

    test('DS-361 | should mark the last breadcrumb item as selected', async () => {
      const lastTabIndex = await breadcrumbs.getLastItemTabIndex();
      expect(['-1', null]).toContain(lastTabIndex);

      const lastText = await breadcrumbs.getLastItemText();
      expect((lastText ?? '').trim().length).toBeGreaterThan(0);
    });

    test('DS-361 | should move focus from first to second breadcrumb on Tab press', async () => {
      const frame = breadcrumbs.page.frameLocator('iframe');
      const firstLink = frame
        .locator('igds-breadcrumb-item')
        .nth(0)
        .locator('a');
      const secondLink = frame
        .locator('igds-breadcrumb-item')
        .nth(1)
        .locator('a');

      await firstLink.focus();
      await expect(firstLink).toBeFocused();

      await breadcrumbs.page.keyboard.press('Tab');
      await expect(secondLink).toBeFocused();
    });
  });
});
