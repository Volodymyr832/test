import {test} from '@playwright/test';
import {DividerPage} from './divider.page';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';

test.describe('Divider Functional Tests', () => {
  let divider: DividerPage;

  test('DS-378 | should display default horizontal divider', async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.divider.default);
    divider = new DividerPage(loadedPage);
    await divider.waitForReady();
    await divider.assertOrientation('horizontal');
  });

  test('DS-378 | should display vertical divider', async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.divider.vertical);
    divider = new DividerPage(loadedPage);
    await divider.waitForReady();
    await divider.assertOrientation('vertical');
  });

  test('DS-378 | should display inverted divider', async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.divider.inverted);
    divider = new DividerPage(loadedPage);
    await divider.waitForReady();
    await divider.assertInverted(true);
  });

  test('DS-378 | should display inset horizontal divider', async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.divider.inset);
    divider = new DividerPage(loadedPage);
    await divider.waitForReady();
    await divider.assertInset(true);
    await divider.assertOrientation('horizontal');
  });

  test('DS-378 | should display inset vertical divider', async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.divider.insetVertical);
    divider = new DividerPage(loadedPage);
    await divider.waitForReady();
    await divider.assertInset(true);
    await divider.assertOrientation('vertical');
  });
});
