import {test} from '@playwright/test';
import {TooltipPage} from './tooltip.page';
import {storyPaths} from '../../utils/storyPaths';
import {openStory} from '../../utils/storybook';

test.describe('Tooltip Accessibility Tests', () => {
  let tooltip: TooltipPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.tooltip.default);
    tooltip = new TooltipPage(loadedPage);
    await tooltip.waitForReady();
  });

  test('DS-393 | should have role and aria attributes', async () => {
    await tooltip.hoverOnTrigger();
    await tooltip.assertAriaAttributes();
  });
});
