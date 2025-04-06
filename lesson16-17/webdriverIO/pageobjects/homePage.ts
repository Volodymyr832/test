import { $ } from '@wdio/globals';

class HomePage {
  get searchInput() {
    return $('#search');
  }

  async open() {
    await browser.url('https://magento.softwaretestingboard.com/');
  }

  async acceptCookies() {
    const acceptBtn = await $('#accept-btn');
    if (await acceptBtn.isExisting()) {
      await browser.waitUntil(async () => {
        return await acceptBtn.isDisplayed() && await acceptBtn.isClickable();
      }, {
        timeout: 5000,
        timeoutMsg: 'Agre button is not displayed'
      });
      await acceptBtn.click();

      await browser.waitUntil(async () => {
        return !(await acceptBtn.isDisplayed());
      }, {
        timeout: 5000,
        timeoutMsg: 'Button agree is not displayed after click'
      });
    }
  }

  async search(term: string) {
    await this.searchInput.waitForDisplayed({ timeout: 10000 });
    await this.searchInput.click();
    await this.searchInput.setValue(term);
    await browser.keys('Enter');
  }
}

export default new HomePage();
