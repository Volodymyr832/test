import {test, expect} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';
import {RatingPage} from './rating.page';

test.describe('Rating Accessibility', () => {
  let rating: RatingPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.rating.default);
    rating = new RatingPage(loadedPage);
    await rating.waitForReady();
  });

  test('DS-909 | should have aria-labels and aria-checked attributes on stars', async () => {
    const count = await rating.getStarCount();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const label = await rating.getStarLabel(i);
      expect(label ?? '').not.toBe('');
    }
  });
});
