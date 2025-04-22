import {test} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {TooltipPage} from './tooltip.page';
import {storyPaths} from '../../utils/storyPaths';

test.describe('Tooltip Functional Tests', () => {
  let tooltip: TooltipPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.tooltip.default);
    tooltip = new TooltipPage(loadedPage);
    await tooltip.waitForReady();
  });

  test('DS-391 | should display tooltip on hover', async () => {
    await tooltip.hoverOnTrigger();
    await tooltip.assertTooltipVisible();
  });

  test('DS-391 | should display correct tooltip text', async () => {
    await tooltip.hoverOnTrigger();
    await tooltip.assertTooltipHasText(
      'יש להוסיף טקסט המוסיף מידע למידע הקיים בממשק ולהימנע מחזרה על הטקסט הקיים'
    );
  });
});
