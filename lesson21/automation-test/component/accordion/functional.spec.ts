import {test, expect} from '@playwright/test';

import {AccordionPage} from './accordion.page';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';

test.describe('Accordion Functional Tests', () => {
  let accordion: AccordionPage;

  test('DS-351 | Single ➜ expand/collapse one item', async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.accordion.single);
    accordion = new AccordionPage(loadedPage);

    await accordion.waitForReady();

    await accordion.expandItem(0);
    await accordion.assertPanelVisible(0);

    await accordion.expandItem(0);
    await accordion.assertPanelHidden(0);
  });

  test('DS-351 | Multiple ➜ allows multiple items open', async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.accordion.multiple);
    accordion = new AccordionPage(loadedPage);

    await accordion.waitForReady();

    await accordion.expandItem(0);
    await accordion.assertPanelVisible(0);

    await accordion.expandItem(1);
    await accordion.assertPanelVisible(1);

    const panelsCount = await accordion.panels.count();
    expect(panelsCount).toBeGreaterThan(1);
  });

  test('DS-351 | Expanded ➜ first item open by default', async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.accordion.expanded);
    accordion = new AccordionPage(loadedPage);

    await accordion.waitForReady();

    await accordion.assertPanelVisible(0);
  });

  test('DS-351 | Disabled ➜ item cannot be expanded', async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.accordion.disabled);
    accordion = new AccordionPage(loadedPage);

    await accordion.waitForReady();

    await accordion.assertItemDisabled(0);
    await accordion.assertPanelHidden(0);
  });

  test('DS-351 | LTR ➜ layout should be left-to-right', async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.accordion.ltr);
    accordion = new AccordionPage(loadedPage);

    await accordion.waitForReady();

    await accordion.assertLtrLayout(0);
  });

  test('DS-351 | With icon ➜ item should show icon', async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.accordion.withIcon);
    accordion = new AccordionPage(loadedPage);

    await accordion.waitForReady();

    await accordion.assertItemHasIcon(0);
  });

  test('DS-351 | With icon LTR ➜ item should show icon and be LTR', async ({
    page,
  }) => {
    const loadedPage = await openStory(page, storyPaths.accordion.withIconLtr);
    accordion = new AccordionPage(loadedPage);

    await accordion.waitForReady();

    await accordion.assertItemHasIcon(0);
    await accordion.assertLtrLayout(0);
  });
});
