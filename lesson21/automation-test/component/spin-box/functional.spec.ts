import {test, expect} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';
import {SpinBoxPage} from './spin-box.page';

test.describe('Spin Box Functional Tests', () => {
  test.describe('Default', () => {
    let spinBox: SpinBoxPage;

    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.spinBox.default);
      spinBox = new SpinBoxPage(loadedPage);
      await spinBox.waitForReady();
    });

    test('DS-792 | should increment and decrement correctly', async () => {
      await spinBox.setValue('1');
      await spinBox.increment();
      expect(await spinBox.getValue()).toBe('2');

      await spinBox.decrement();
      expect(await spinBox.getValue()).toBe('1');
    });
  });

  test.describe('Disabled', () => {
    let spinBox: SpinBoxPage;

    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.spinBox.disabled);
      spinBox = new SpinBoxPage(loadedPage);
      await spinBox.waitForReady();
    });

    test('DS-792 | should be disabled', async () => {
      expect(await spinBox.isDisabled()).toBe(true);
    });
  });

  test.describe('Error', () => {
    let spinBox: SpinBoxPage;

    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.spinBox.error);
      spinBox = new SpinBoxPage(loadedPage);
      await spinBox.waitForReady();
    });

    test('DS-792 | should have aria-invalid attribute set', async () => {
      expect(await spinBox.getAriaInvalid()).toBe('true');
    });
  });

  test.describe('LTR', () => {
    let spinBox: SpinBoxPage;

    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.spinBox.ltr);
      spinBox = new SpinBoxPage(loadedPage);
      await spinBox.waitForReady();
    });

    test('DS-792 | should have LTR direction', async () => {
      expect(await spinBox.getDirection()).toBe('ltr');
    });
  });

  test.describe('Min / Max values', () => {
    let spinBox: SpinBoxPage;

    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.spinBox.minMax);
      spinBox = new SpinBoxPage(loadedPage);
      await spinBox.waitForReady();
    });

    test('DS-792 | should not go below min or above max', async () => {
      await spinBox.setValue('10');
      await spinBox.increment();
      expect(parseInt(await spinBox.getValue(), 10)).toBeLessThanOrEqual(11);

      await spinBox.setValue('0');
      await spinBox.decrement();
      expect(parseInt(await spinBox.getValue(), 10)).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('Small size', () => {
    let spinBox: SpinBoxPage;

    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.spinBox.small);
      spinBox = new SpinBoxPage(loadedPage);
      await spinBox.waitForReady();
    });

    test('DS-792 | should increment and decrement in small size', async () => {
      await spinBox.setValue('3');
      await spinBox.increment();
      expect(await spinBox.getValue()).toBe('4');

      await spinBox.decrement();
      expect(await spinBox.getValue()).toBe('3');
    });
  });

  test.describe('With help text', () => {
    let spinBox: SpinBoxPage;

    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.spinBox.withHelp);
      spinBox = new SpinBoxPage(loadedPage);
      await spinBox.waitForReady();
    });

    test('DS-792 | should be functional with help text present', async () => {
      expect(await spinBox.hasHelpText()).toBe(true);

      const text = await spinBox.getHelpText();
      console.log('[Help text]', text);
      expect(text.length).toBeGreaterThan(0);

      await spinBox.setValue('5');
      await spinBox.increment();
      expect(await spinBox.getValue()).toBe('6');
    });
  });

  test.describe('Inside form', () => {
    let spinBox: SpinBoxPage;

    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.spinBox.insideForm);
      spinBox = new SpinBoxPage(loadedPage);
      await spinBox.waitForReady();
    });

    test('DS-792 | should allow manual input inside form', async () => {
      await spinBox.setValue('7');
      expect(await spinBox.getValue()).toBe('7');
    });
  });
});
