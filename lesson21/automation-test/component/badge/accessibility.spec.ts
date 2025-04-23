import {test, expect} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {BadgePage} from './badge.page';
import {storyPaths} from '../../utils/storyPaths';

test.describe('Badge Accessibility Tests', () => {
  test.describe('Regular Badge', () => {
    let badgePage: BadgePage;

    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.badge.regular);
      badgePage = new BadgePage(loadedPage);
      await badgePage.waitForReady();
    });

    test('DS-431 | should have accessible role and label on regular badge', async () => {
      const wrapper = badgePage.regularBadgeWrapper(0);
      const text = badgePage.regularBadgeText(0);

      await expect(wrapper).toHaveAttribute('role', 'status');
      await expect(wrapper).toHaveAttribute('aria-live', 'polite');

      await expect(text).toHaveText(/.+/);
    });
  });

  test.describe('Numeric Badge', () => {
    let badgePage: BadgePage;

    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.badge.numeric);
      badgePage = new BadgePage(loadedPage);
      await badgePage.waitForReady();
    });

    test('DS-431 | should have accessible role and label on numeric badge', async () => {
      const wrapper = badgePage.numericBadgeWrapper(0);
      const text = badgePage.numericBadgeText(0);

      await expect(wrapper).toHaveAttribute('role', 'status');
      await expect(wrapper).toHaveAttribute('aria-live', 'polite');

      const rawText = await text.textContent();
      const trimmed = rawText?.trim();

      expect(trimmed).toMatch(/^\d+$/);
    });
  });
});
