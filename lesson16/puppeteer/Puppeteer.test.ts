import puppeteer from 'puppeteer';

describe('Rozetka Search Tests (Puppeteer)', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Search for RZTK', async () => {
    await page.goto('https://rozetka.com.ua/');
    await page.type("input[name='search']", 'RZTK');
    await Promise.all([
      page.waitForNavigation(),
      page.click("button.search-form__submit")
    ]);
    const grid = await page.$('ul.catalog-grid');
    expect(grid).toBeTruthy();
  });

  test('Filter by price', async () => {
    await page.goto('https://rozetka.com.ua/search/?text=RZTK');
    await page.type("input[formcontrolname='min']", '1000');
    await page.type("input[formcontrolname='max']", '5000');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.click("button.slider-filter__button")
    ]);
    const grid = await page.$('ul.catalog-grid');
    expect(grid).toBeTruthy();
  });
});
