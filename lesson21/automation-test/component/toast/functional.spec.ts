import {expect, test} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';
import {ToastPage} from './toast.page';

test.describe('Toast Functional Tests', () => {
  let toastPage: ToastPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.toast.floating);
    toastPage = new ToastPage(loadedPage);
  });

  test('DS-587 | should display success toast on button click with correct text', async () => {
    await toastPage.showSuccessToast();
    await toastPage.waitForSuccessToastVisible();

    const hasText = await toastPage.hasAnyTextInSuccessToast();
    expect(hasText).toBe(true);
  });

  test('DS-587 | should display failure toast on button click with correct text', async () => {
    await toastPage.showFailureToast();
    await toastPage.waitForFailureToastVisible();

    const hasText = await toastPage.hasAnyTextInFailureToast();
    expect(hasText).toBe(true);
  });

  test('DS-587 | should close success toast', async () => {
    await toastPage.showSuccessToast();
    await toastPage.waitForSuccessToastVisible();

    await toastPage.closeSuccessToast();

    await expect(toastPage.successToastLocator).not.toBeVisible();
  });

  test('DS-587 | should close failure toast', async () => {
    await toastPage.showFailureToast();
    await toastPage.waitForFailureToastVisible();

    await toastPage.closeFailureToast();

    await expect(toastPage.failureToastLocator).not.toBeVisible();
  });
});
