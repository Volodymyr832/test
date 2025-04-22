import {expect, test} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';
import {TextareaPage} from './text-area.page';

test.describe('Textarea › Default', () => {
  let textareaPage: TextareaPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.textArea.default);
    textareaPage = new TextareaPage(loadedPage);
  });

  test('DS-471 | should allow typing text', async () => {
    await textareaPage.typeText('Hello world');
    const value = await textareaPage.getTextareaValue();
    expect(value).toBe('Hello world');
  });
});

test.describe('Textarea › Disabled', () => {
  let textareaPage: TextareaPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.textArea.disabled);
    textareaPage = new TextareaPage(loadedPage);
  });

  test('DS-471 | should be disabled', async () => {
    const isDisabled = await textareaPage.isDisabled();
    expect(isDisabled).toBe(true);
  });
});

test.describe('Textarea › Invalid', () => {
  let textareaPage: TextareaPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.textArea.invalid);
    textareaPage = new TextareaPage(loadedPage);
  });

  test('DS-471 | should have aria-invalid=true', async () => {
    const hasInvalid = await textareaPage.hasInvalidAttribute();
    expect(hasInvalid).toBe(true);
  });
});

test.describe('Textarea › LTR', () => {
  let textareaPage: TextareaPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.textArea.ltr);
    textareaPage = new TextareaPage(loadedPage);
  });

  test('DS-471 | should have dir="ltr" or reflect LTR layout', async () => {
    const dir = await textareaPage.getDirAttribute();
    expect(dir).toBe('ltr');
  });
});
