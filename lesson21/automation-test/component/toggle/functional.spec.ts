import {test} from '@playwright/test';
import {TogglePage} from './toggle.page';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';

test.describe('Toggle Functional Tests', () => {
  let toggle: TogglePage;

  test.describe('Default Toggle', () => {
    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.toggle.default);
      toggle = new TogglePage(loadedPage);
      await toggle.waitForReady();
    });

    test('DS-398 | should toggle on click', async () => {
      await toggle.clickToggle();
      await toggle.assertChecked(true);

      await toggle.clickToggle();
      await toggle.assertChecked(false);
    });
  });

  test.describe('Checked Toggle', () => {
    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.toggle.checked);
      toggle = new TogglePage(loadedPage);
      await toggle.waitForReady();
    });

    test('DS-398 | should be initially checked', async () => {
      await toggle.assertChecked(true);
    });

    test('DS-398 | should toggle off on click', async () => {
      await toggle.clickToggle();
      await toggle.assertChecked(false);
    });
  });

  test.describe('Disabled Toggle', () => {
    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.toggle.disabled);
      toggle = new TogglePage(loadedPage);
      await toggle.waitForReady();
    });

    test('DS-398 | should be disabled and not toggle on click', async () => {
      await toggle.assertDisabled(true);
      const isCheckedBefore = await toggle.isChecked();
      await toggle.assertChecked(isCheckedBefore);
    });
  });

  test.describe('LTR Toggle', () => {
    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.toggle.ltr);
      toggle = new TogglePage(loadedPage);
      await toggle.waitForReady();
    });

    test('DS-398 | should toggle and have LTR direction', async () => {
      await toggle.clickToggle();
      await toggle.assertChecked(true);
      await toggle.assertDirection('ltr');
    });
  });
});
