import {test, expect} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';
import {ProgressBarPage} from './progress-bar.page';

test.describe('Progress Bar Functional Tests', () => {
  let progressBar: ProgressBarPage;

  test('DS-386 | Progress Bar ➜ should show correct progress and aria attributes', async ({
    page,
  }) => {
    const loadedPage = await openStory(
      page,
      storyPaths['progressBar']['progressBar']
    );
    progressBar = new ProgressBarPage(loadedPage);

    await progressBar.waitForReady();
    await progressBar.assertProgressValue(70);
    await progressBar.assertAriaAttributes('0', '100', '70');
  });

  test('DS-386 | Progress Bar Scenario ➜ should show progress and aria attributes', async ({
    page,
  }) => {
    const loadedPage = await openStory(
      page,
      storyPaths['progressBar']['progressBar']
    );
    progressBar = new ProgressBarPage(loadedPage);

    await progressBar.waitForReady();

    const actualValue = await progressBar.getProgressValue();
    expect(actualValue).toBeGreaterThanOrEqual(0);
    expect(actualValue).toBeLessThanOrEqual(100);

    await progressBar.assertAriaAttributes('0', '100');
  });

  test('DS-386 | Spinner ➜ should show spinner indicator', async ({page}) => {
    const loadedPage = await openStory(
      page,
      storyPaths['progressBar']['spinner']
    );
    progressBar = new ProgressBarPage(loadedPage);

    await progressBar.waitForReady();
    await progressBar.assertSpinnerVisible();
  });

  test('DS-386 | Inverted Spinner ➜ should show inverted spinner indicator', async ({
    page,
  }) => {
    const loadedPage = await openStory(
      page,
      storyPaths['progressBar']['invertedSpinner']
    );
    progressBar = new ProgressBarPage(loadedPage);

    await progressBar.waitForReady();
    await progressBar.assertSpinnerVisible();
  });
});
