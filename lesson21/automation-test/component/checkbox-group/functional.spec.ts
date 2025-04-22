import {test, expect} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';
import {CheckboxPage} from './checkbox.page';

test.describe('Checkbox‑group | inside‑form', () => {
  let cb: CheckboxPage;

  test.beforeEach(async ({page}) => {
    const story = await openStory(page, storyPaths.checkboxGroup.insideForm);
    cb = new CheckboxPage(story);
    await cb.waitForReady();
  });

  test('DS‑369 | keyboard select all & submit form', async () => {
    const total = await cb.getCount();
    expect(total).toBeGreaterThan(0);

    for (let i = 0; i < total; i++) {
      await cb.spaceToggle(i);
      expect(await cb.isChecked(i)).toBe(true);
      await cb.page.keyboard.press('Tab');
    }

    await cb.fillText('test value');
    await cb.page.keyboard.press('Tab');

    await cb.submitForm();

    await cb.page.waitForTimeout(500);
  });
});
