import {test, expect} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';
import {ButtonPage} from './button.page';

test.describe('Button Accessibility', () => {
  test.describe('With aria label', () => {
    let button: ButtonPage;

    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.button.withAriaLabel);
      button = new ButtonPage(loadedPage);
      await button.waitForReady();
    });

    test('DS-367 | should have accessible aria-label on button', async () => {
      const count = await button.getButtonCount();
      expect(count).toBeGreaterThan(0);

      const nativeBtn = button.getNativeButton(0);
      const ariaLabel = await nativeBtn.getAttribute('aria-label');

      console.log('[aria-label]:', ariaLabel);

      expect(ariaLabel ?? '').not.toBe('');
      expect(ariaLabel).toContain('שלח');
    });
  });

  test.describe('With icon', () => {
    let button: ButtonPage;

    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.button.withIcon);
      button = new ButtonPage(loadedPage);
      await button.waitForReady();
    });

    test('DS-367 | should have icon and visible text inside button', async () => {
      const count = await button.getButtonCount();
      expect(count).toBeGreaterThan(0);

      const textContent = await button.getButtonText(0);
      console.log('[Visible text]:', textContent);
      expect((textContent ?? '').trim().length).toBeGreaterThan(0);

      const iconSlot = button.getButtonIcon(0);
      await expect(iconSlot).toBeVisible();
    });
  });
});
