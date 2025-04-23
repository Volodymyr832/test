import {expect, test} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';
import {ToastPage} from './toast.page';

test.describe('Toast Accessibility Tests', () => {
  let toastPage: ToastPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.toast.inline);
    toastPage = new ToastPage(loadedPage);
  });

  test('DS-587 | should have aria role status for inline toast', async () => {
    if (!toastPage.frame) await toastPage.initFrame();

    const hostHandle = await toastPage.frame.waitForSelector('igds-toast');
    const ariaRole = await hostHandle.evaluate((host: Element) => {
      const toast = host.shadowRoot?.querySelector('.toast');
      return toast?.getAttribute('role');
    });

    expect(ariaRole).toBe('status');
  });

  test('DS-587 | should be focusable', async () => {
    if (!toastPage.frame) await toastPage.initFrame();

    const hostHandle = await toastPage.frame.waitForSelector('igds-toast');
    const tabindex = await hostHandle.evaluate((host: Element) => {
      const toast = host.shadowRoot?.querySelector('.toast');
      return toast?.getAttribute('tabindex');
    });

    expect(tabindex).toBe('0');
  });
});
