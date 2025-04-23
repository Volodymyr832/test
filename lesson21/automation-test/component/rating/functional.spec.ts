import {test, expect} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';
import {RatingPage} from './rating.page';

test.describe('Rating Functional Tests', () => {
  let rating: RatingPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.rating.default);
    rating = new RatingPage(loadedPage);
    await rating.waitForReady();
  });

  test('DS-907 | should render five stars and allow selection', async () => {
    const count = await rating.getStarCount();
    expect(count).toBe(5);

    await rating.selectStar(2);
    expect(await rating.isStarChecked(2)).toBe(true);
  });

  test('DS-907 | should allow changing selected rating with arrow keys', async () => {
    const count = await rating.getStarCount();
    expect(count).toBe(5);

    await rating.selectStar(2);
    expect(await rating.isStarChecked(2)).toBe(true);

    await rating.stars.nth(2).focus();
    await expect(rating.stars.nth(2)).toBeFocused();

    await rating.page.keyboard.press('ArrowLeft');
    await rating.page.keyboard.press('ArrowLeft');
    await rating.page.keyboard.press('ArrowLeft');
    await rating.page.keyboard.press('ArrowLeft');

    expect(await rating.isStarChecked(3)).toBe(true);
  });
});

test.describe('Rating Functional Tests', () => {
  let rating: RatingPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.rating.face);
    rating = new RatingPage(loadedPage);
    await rating.waitForReady();
  });

  test('DS-907 | should allow changing face rating with arrow keys', async () => {
    const count = await rating.getStarCount();
    expect(count).toBeGreaterThan(1);

    await rating.selectStar(2);
    expect(await rating.isStarChecked(2)).toBe(true);

    await rating.stars.nth(2).focus();
    await expect(rating.stars.nth(2)).toBeFocused();
  });
});
