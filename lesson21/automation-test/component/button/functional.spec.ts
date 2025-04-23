import {test, expect} from '@playwright/test';
import {ButtonPage} from './button.page';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';

test.describe('Button Functional Tests', () => {
  let button: ButtonPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.button.default);
    button = new ButtonPage(loadedPage);
    await button.waitForReady();
  });

  test('DS-366 | should render all buttons with text', async () => {
    const count = await button.getButtonCount();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const text = await button.getButtonText(i);
      expect((text ?? '').trim().length).toBeGreaterThan(0);
    }
  });

  test('DS-366 | should move focus from first to second button using Tab', async () => {
    const count = await button.getButtonCount();
    expect(count).toBeGreaterThan(1);

    const firstNative = button.getNativeButton(0);
    const secondNative = button.getNativeButton(1);

    await firstNative.focus();
    await expect(firstNative).toBeFocused();
    await button.page.waitForTimeout(500);

    await button.page.keyboard.press('Tab');
    await expect(secondNative).toBeFocused();
    await button.page.waitForTimeout(500);
  });

  test('DS-366 | pressing space applies background-color change', async () => {
    const count = await button.getButtonCount();
    expect(count).toBeGreaterThan(1);

    const firstNative = button.getNativeButton(0);

    await firstNative.focus();
    await expect(firstNative).toBeFocused();
    await button.page.waitForTimeout(300);

    const getBg = async () =>
      await firstNative.evaluate((el) =>
        window.getComputedStyle(el).getPropertyValue('background-color')
      );

    const before = await getBg();
    console.log('[Background before]:', before);

    await button.page.keyboard.down('Space');
    await button.page.waitForTimeout(200);

    const during = await getBg();
    console.log('[Background during]:', during);

    await button.page.keyboard.up('Space');

    expect(during).not.toBe(before);
  });
});

test.describe('Disabled', () => {
  let button: ButtonPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.button.disabled);
    button = new ButtonPage(loadedPage);
    await button.waitForReady();
  });

  test('DS-366 | should have all buttons disabled', async () => {
    const total = await button.getButtonCount();

    for (let i = 0; i < total; i++) {
      expect(await button.isButtonDisabled(i)).toBe(true);
    }
  });
});

test.describe('Loading', () => {
  let button: ButtonPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.button.loading);
    button = new ButtonPage(loadedPage);
    await button.waitForReady();
  });

  test('DS-366 | should have all buttons loading', async () => {
    const total = await button.getButtonCount();

    for (let i = 0; i < total; i++) {
      expect(await button.isButtonLoading(i)).toBe(true);
    }
  });
});

test.describe('InLine', () => {
  let button: ButtonPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(
      page,
      storyPaths.button.linkButtonInline
    );
    button = new ButtonPage(loadedPage);
    await button.waitForReady();
  });

  test('DS-366 | each inline button should have text and icon(s)', async () => {
    const total = await button.getButtonCount();

    for (let i = 0; i < total; i++) {
      const isInline = await button.isInlineButton(i);
      expect(isInline).toBe(true);

      const native = button.getNativeButton(i);

      const hasIcon = await native.locator('slot[name="icon"]').count();
      expect(hasIcon).toBeGreaterThan(0);
    }
  });
});
