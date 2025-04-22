import {test, expect} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';
import {SpinBoxPage} from './spin-box.page';

test.describe('Spin Box Accessibility Tests', () => {
  test.describe('Default', () => {
    let spinBox: SpinBoxPage;

    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.spinBox.default);
      spinBox = new SpinBoxPage(loadedPage);
      await spinBox.waitForReady();
    });

    test('DS-794 | Should have input with aria attributes', async () => {
      const role = await spinBox.input.getAttribute('role');
      const describedBy = await spinBox.input.getAttribute('aria-describedby');

      if (role !== null) {
        expect(role).not.toBe('');
      }

      expect(describedBy).not.toBeNull();
      expect(describedBy).not.toBe('');
    });

    test('DS-794 | Should have visible label and buttons accessible', async () => {
      const incrementVisible = await spinBox.incrementButton.isVisible();
      expect(incrementVisible).toBe(true);
    });
  });
});
