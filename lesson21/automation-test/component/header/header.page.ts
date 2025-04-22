import {Locator, Page} from '@playwright/test';

export class HeaderPage {
  readonly page: Page;
  readonly frameLocator: Locator;
  readonly shadowHeader: Locator;

  readonly logo: Locator;
  readonly hamburgerButton: Locator;
  readonly expandedMenu: Locator;
  readonly searchInput: Locator;
  readonly clearButton: Locator;
  readonly bottomMenuToggle: Locator;
  readonly bottomMenuItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frameLocator = page.frameLocator('iframe');
    this.shadowHeader = this.frameLocator.locator('igds-header');

    this.logo = this.shadowHeader.locator('img.header__logo-image');
    this.hamburgerButton = this.hamburgerButton = this.shadowHeader.locator(
      ':shadow=#trigger-button'
    );
    this.expandedMenu = this.shadowHeader.locator('nav ul li');
    this.searchInput = this.shadowHeader.locator('input[type="text"]');
    this.clearButton = this.shadowHeader.locator(
      'igds-icon.search__clear-icon[role="button"]'
    );
    this.bottomMenuToggle = this.shadowHeader.locator(
      'button[aria-label="Open bottom menu"]'
    );
    this.bottomMenuItems = this.shadowHeader.locator('div.bottom-menu li');
  }

  async isLogoVisible(): Promise<boolean> {
    return await this.logo.isVisible();
  }

  async waitForReady(): Promise<void> {
    await this.logo.waitFor({state: 'visible', timeout: 10000});
  }

  async openMenu(): Promise<void> {
    const buttonHandle = await this.frameLocator
      .locator('igds-header')
      .evaluateHandle(
        (el) => el.shadowRoot?.querySelector('#trigger-button') as HTMLElement
      );

    if (!buttonHandle) {
      throw new Error('cant find hamburger button');
    }

    await buttonHandle.asElement()?.click();
  }

  async isExpandedMenuVisible(): Promise<boolean> {
    const menuHandle = await this.frameLocator
      .locator('igds-header')
      .evaluateHandle((el) =>
        el.shadowRoot?.querySelector('.header__hamburger-button')
      );

    if (!menuHandle) return false;

    const elementHandle = menuHandle.asElement();
    if (!elementHandle) return false;

    return await elementHandle.isVisible();
  }

  async hoverOnSecondMenuItem(): Promise<boolean> {
    const menuItemHandle = await this.page
      .frameLocator('iframe')
      .locator('igds-header')
      .evaluateHandle(
        (header) => header.shadowRoot?.querySelectorAll('igds-menu-item')[1]
      );

    await menuItemHandle.asElement()?.hover();
    await this.page.waitForTimeout(300);

    const submenuVisible = await this.page
      .frameLocator('iframe')
      .locator('igds-header')
      .evaluate((header) => {
        const item = header.shadowRoot?.querySelectorAll('igds-menu-item')[1];
        const submenu = item?.shadowRoot?.querySelector(
          'div.menu-item__submenu'
        );
        return submenu && getComputedStyle(submenu).display !== 'none';
      });

    return submenuVisible;
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
  }

  async isClearButtonVisible(): Promise<boolean> {
    try {
      const visible = await this.clearButton.isVisible();
      console.log('button is visible', visible);
      return visible;
    } catch (e) {
      console.log('Not found', e);
      return false;
    }
  }

  async clearSearch(): Promise<void> {
    await this.clearButton.click();
    await this.page.waitForTimeout(300);
  }

  async getSearchInputValue(): Promise<string> {
    const input = this.searchInput;
    const value = await input.inputValue();
    return value;
  }
}
