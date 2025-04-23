import {test, expect} from '@playwright/test';
import {HeaderPage} from '../header/header.page';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';

test.describe('Header Functional Tests', () => {
  let header: HeaderPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.header.default);
    header = new HeaderPage(loadedPage);
    await header.waitForReady();
  });

  test('DS-844 | should display logo', async () => {
    expect(await header.isLogoVisible()).toBe(true);
  });

  test('DS-844 | should open menu on hamburger click', async () => {
    await header.openMenu();
    expect(await header.isExpandedMenuVisible()).toBe(true);
  });

  test('DS-844 | should show submenu on second menu item hover', async () => {
    await header.openMenu();
    const isShown = await header.hoverOnSecondMenuItem();
    expect(isShown).toBe(true);
  });

  test('DS-844 | should allow typing in search input, show and clear with clear button', async () => {
    await header.search('Playwright');

    expect(await header.isClearButtonVisible()).toBe(true);

    await header.clearSearch();
    expect(await header.getSearchInputValue()).toBe('');
    expect(await header.isClearButtonVisible()).toBe(false);
  });
});
