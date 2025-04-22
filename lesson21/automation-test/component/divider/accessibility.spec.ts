import {test, expect} from '@playwright/test';
import {DividerPage} from './divider.page';
import {storyPaths} from '../../utils/storyPaths';
import {openStory} from '../../utils/storybook';

test.describe('Divider Accessibility Tests', () => {
  let divider: DividerPage;

  test('DS-381 | vertical divider should have orientation vertical', async ({
    page,
  }) => {
    const loadedPage = await openStory(page, storyPaths.divider.vertical);
    divider = new DividerPage(loadedPage);
    await divider.waitForReady();

    await expect(divider.divider).toHaveAttribute(
      'orientation',
      'igds-vertical-divider'
    );
  });

  test('DS-381 | inverted divider should have attribute inverted', async ({
    page,
  }) => {
    const loadedPage = await openStory(page, storyPaths.divider.inverted);
    divider = new DividerPage(loadedPage);
    await divider.waitForReady();

    await expect(divider.divider).toHaveAttribute('inverted', '');
  });

  test('DS-381 | inset horizontal divider should have proper attributes', async ({
    page,
  }) => {
    const loadedPage = await openStory(page, storyPaths.divider.inset);
    divider = new DividerPage(loadedPage);
    await divider.waitForReady();

    await expect(divider.divider).toHaveAttribute(
      'width',
      'igds-inset-divider'
    );
    await expect(divider.divider).toHaveAttribute(
      'orientation',
      'igds-horizontal-divider'
    );
  });

  test('DS-381 | inset vertical divider should have proper attributes', async ({
    page,
  }) => {
    const loadedPage = await openStory(page, storyPaths.divider.insetVertical);
    divider = new DividerPage(loadedPage);
    await divider.waitForReady();

    await expect(divider.divider).toHaveAttribute(
      'width',
      'igds-inset-divider'
    );
    await expect(divider.divider).toHaveAttribute(
      'orientation',
      'igds-vertical-divider'
    );
  });
});
