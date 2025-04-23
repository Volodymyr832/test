import {test} from '@playwright/test';
import {TogglePage} from './toggle.page';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';

test.describe('Toggle Accessibility Tests', () => {
  let toggle: TogglePage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.toggle.default);
    toggle = new TogglePage(loadedPage);
    await toggle.waitForReady();
  });

  test('DS-399 | should toggle aria attributes', async () => {
    await toggle.clickToggle();
    await toggle.assertAriaAttributes('true');
    await toggle.clickToggle();
    await toggle.assertAriaAttributes('false');
  });
});
