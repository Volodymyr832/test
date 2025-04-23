import {test, expect} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {BadgePage} from './banner.page';
import {storyPaths} from '../../utils/storyPaths';

test.describe('Badge Functional Tests', () => {
  test.describe('Regular Badge', () => {
    let badgePage: BadgePage;

    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.badge.regular);
      badgePage = new BadgePage(loadedPage);
      await badgePage.waitForReady();
    });

    test('DS-430 | should display correct text for regular badges', async () => {
      const text = await badgePage.getBadgeText(0);
      expect(text).toContain('בְּרִירַת מֶחדָל');
    });
  });

  test.describe('Numeric Badge', () => {
    let badgePage: BadgePage;

    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.badge.numeric);
      badgePage = new BadgePage(loadedPage);
      await badgePage.waitForReady();
    });

    test('DS-430 | should display correct counter on numeric badge', async () => {
      const counterValue = await badgePage.getNumericBadgeCount(0);
      expect(counterValue).toBe('9');
    });
  });
});
