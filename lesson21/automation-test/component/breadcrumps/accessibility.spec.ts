import {test, expect} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';
import {BreadcrumbsPage} from '../breadcrumps/breadcrumps.page';

test.describe('Breadcrumbs Accessibility', () => {
  test.describe('Default', () => {
    let breadcrumbs: BreadcrumbsPage;

    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.breadcrumbs.default);
      breadcrumbs = new BreadcrumbsPage(loadedPage);
      await breadcrumbs.waitForReady();
    });

    test('DS-359 | should have correct number of items and separators', async () => {
      const itemCount = await breadcrumbs.getItemCount();
      const separatorCount = await breadcrumbs.getSeparatorCount();

      expect(itemCount).toBeGreaterThan(1);
      expect(separatorCount).toBe(itemCount - 1);
    });

    test('DS-359 | each breadcrumb should have visible text', async () => {
      const itemCount = await breadcrumbs.getItemCount();
      for (let i = 0; i < itemCount; i++) {
        const text = await breadcrumbs.getItemText(i);
        expect((text ?? '').trim().length).toBeGreaterThan(0);
      }
    });
  });
});
