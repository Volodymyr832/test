import {test} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';
import {ProgressBarPage} from './progress-bar.page';

test.describe('Progress Bar Accessibility Tests', () => {
  let progressBar: ProgressBarPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(
      page,
      storyPaths['progressBar']['progressBar']
    );
    progressBar = new ProgressBarPage(loadedPage);
    await progressBar.waitForReady();
  });

  test('DS-387 | should have aria attributes for progressbar', async () => {
    await progressBar.assertAriaAttributes('0', '100', '70');
  });

  test('DS-387 | should display spinner if type=spinner', async ({page}) => {
    const loadedPage = await openStory(
      page,
      storyPaths['progressBar']['spinner']
    );
    progressBar = new ProgressBarPage(loadedPage);

    await progressBar.waitForReady();
    await progressBar.assertSpinnerVisible();
  });
});
