import HomePage from '../pageobjects/homePage';
import SearchPage from '../pageobjects/searchPage';
import SessionPage from '../pageobjects/sessionPage';

describe('Magento Search Tests (WDIO)', () => {
  beforeEach(async () => {
    await browser.deleteCookies();
    await HomePage.open();
    await HomePage.acceptCookies();
  });

  it('Search for "jacket"', async () => {
    await HomePage.search('jacket');
    await SearchPage.waitForResults();
    expect(await SearchPage.productItems.length).toBeGreaterThan(0);
  });

  it('Filter by category', async () => {
    await browser.url('https://magento.softwaretestingboard.com/catalogsearch/result/?q=jacket');
    await SearchPage.waitForResults();
    await SearchPage.applyCategoryFilter();
    await SearchPage.waitForResults();
    expect(await SearchPage.productItems.length).toBeGreaterThan(0);
    expect(await SearchPage.filterCurrent.getText()).toContain('Category');
  });
});
