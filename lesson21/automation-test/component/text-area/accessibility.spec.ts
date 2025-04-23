import {expect, test} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';
import {TextareaPage} from './text-area.page';

test.describe('Textarea Accessibility Tests', () => {
  let textareaPage: TextareaPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.textArea.default);
    textareaPage = new TextareaPage(loadedPage);
  });

  test('DS-473 | should be focusable', async () => {
    await expect(textareaPage.textareaLocator).toBeVisible();
    await textareaPage.textareaLocator.focus();

    const tag = await textareaPage.getActiveTextareaTagNameFromShadowDom();
    expect(tag).toBe('TEXTAREA');
  });

  test('DS-473 | should have maxLength set to 100', async () => {
    const maxLength = await textareaPage.textareaLocator.getAttribute(
      'maxlength'
    );
    expect(maxLength).toBe('100');
  });

  test('DS-473 | should have correct placeholder text', async () => {
    const placeholder = await textareaPage.textareaLocator.getAttribute(
      'placeholder'
    );
    expect(placeholder).toBe('טקסט');
  });
});
