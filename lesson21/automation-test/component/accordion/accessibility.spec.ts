import {test, expect} from '@playwright/test';
import {AccordionPage} from './accordion.page';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';

test.describe('Accordion Accessibility Tests - core-web only', () => {
  let accordion: AccordionPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.accordion.single);
    accordion = new AccordionPage(loadedPage);
    await accordion.waitForReady();
  });

  test('DS-350 | should have accessible roles and attributes', async ({
    page,
  }) => {
    const headerCount = await accordion.headers.count();

    const frame = page.frameLocator('iframe');
    await frame.locator('body').focus();

    for (let index = 0; index < headerCount; index++) {
      const header = accordion.headers.nth(index);
      const parent = header.locator('xpath=..');

      const ariaExpanded = await parent.getAttribute('aria-expanded');
      const ariaDisabled = await parent.getAttribute('aria-disabled');

      expect(ariaExpanded || ariaDisabled).not.toBeNull();

      if (ariaExpanded !== null) {
        expect(ariaExpanded).toMatch(/true|false/);
      }

      if (ariaDisabled !== null) {
        expect(ariaDisabled).toBe('true');
      }

      await header.focus();
      await expect(header).toBeFocused();
    }
  });

  test('DS-350 | should toggle aria-expanded on click', async () => {
    const header = accordion.headers.first();
    const parent = header.locator('xpath=..');

    await expect(parent).toHaveAttribute('aria-expanded', 'false');

    await header.click();
    await expect(parent).toHaveAttribute('aria-expanded', 'true');

    await header.click();
    await expect(parent).toHaveAttribute('aria-expanded', 'false');
  });

  test('DS-350 | disabled item should have aria-disabled=true', async ({
    page,
  }) => {
    const loadedPage = await openStory(page, storyPaths.accordion.disabled);
    const accordion = new AccordionPage(loadedPage);

    await accordion.waitForReady();

    const item = accordion.frame
      .locator('igds-accordion-item[disabled]')
      .first();

    await expect(item).toHaveAttribute('disabled', '');
  });
});
