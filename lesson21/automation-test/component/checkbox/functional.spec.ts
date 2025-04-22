import {test, expect} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';
import {CheckboxPage} from './checkbox.page';

test.describe('Checkbox – Functional', () => {
  test.describe('Default', () => {
    let cb: CheckboxPage;

    test.beforeEach(async ({page}) => {
      const loaded = await openStory(page, storyPaths.checkbox.default);
      cb = new CheckboxPage(loaded);
      await cb.waitForReady();
    });

    test('DS‑369 | should toggle by click', async () => {
      expect(await cb.isChecked()).toBe(false);

      await cb.toggle();
      expect(await cb.isChecked()).toBe(true);

      await cb.toggle();
      expect(await cb.isChecked()).toBe(false);
    });

    test('DS-369 | should toggle by keyboard', async () => {
      expect(await cb.isChecked()).toBe(false);

      await cb.toggleWithKeyboard();
      await cb.page.waitForTimeout(2000);
      expect(await cb.isChecked()).toBe(true);
    });
  });

  test.describe('Disabled', () => {
    let cb: CheckboxPage;

    test.beforeEach(async ({page}) => {
      const loaded = await openStory(page, storyPaths.checkbox.disabled);
      cb = new CheckboxPage(loaded);
      await cb.waitForReady();
    });

    test('DS-369 | should be disabled & not change on click', async () => {
      expect(await cb.isDisabled()).toBe(true);
    });
  });

  test.describe('Error', () => {
    let cb: CheckboxPage;

    test.beforeEach(async ({page}) => {
      const loaded = await openStory(page, storyPaths.checkbox.error);
      cb = new CheckboxPage(loaded);
      await cb.waitForReady();
    });

    test('DS-369 | should expose aria-invalid="true"', async () => {
      expect(await cb.isAriaInvalid()).toBe(true);
    });
  });

  test.describe('Checked', () => {
    let cb: CheckboxPage;

    test.beforeEach(async ({page}) => {
      const loaded = await openStory(page, storyPaths.checkbox.checked);
      cb = new CheckboxPage(loaded);
      await cb.waitForReady();
    });

    test('DS-369 | should be checked', async () => {
      expect(await cb.isChecked()).toBe(true);
    });
  });

  test.describe('InsideForm', () => {
    let cb: CheckboxPage;

    test.beforeEach(async ({page}) => {
      const loaded = await openStory(page, storyPaths.checkbox.insideForm);
      cb = new CheckboxPage(loaded);
      await cb.waitForReady();
    });

    test('DS‑369 | should allow typing, checking and form submit', async () => {
      expect(await cb.isChecked()).toBe(false);
      await cb.fillText('test');
      await cb.toggle();
      expect(await cb.isChecked()).toBe(true);
      await cb.submitForm();
      await cb.page.waitForTimeout(2000);
    });
  });
});
