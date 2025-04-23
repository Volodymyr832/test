import {test, expect} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';
import {CheckboxPage} from './checkbox.page';

test.describe('Checkbox – Accessibility', () => {
  let cb: CheckboxPage;

  test.beforeEach(async ({page}) => {
    const loaded = await openStory(page, storyPaths.checkbox.default);
    cb = new CheckboxPage(loaded);
    await cb.waitForReady();
  });

  test('DS-369 | visible label text should not be empty', async () => {
    expect(await cb.getLabelText()).not.toBe('');
  });
});
