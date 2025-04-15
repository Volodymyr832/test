import puppeteer, { Browser, Page } from 'puppeteer';

jest.setTimeout(40000); 

describe('Magento Search Tests (Puppeteer)', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ['--start-maximized'],
    });

    page = await browser.newPage();

    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('cookie-accepted', 'true');
    });
  });

  beforeEach(async () => {
    const client = await page.target().createCDPSession();
    await client.send('Network.clearBrowserCookies');
  });

  afterAll(async () => {
    await browser.close();
  });

  
  
  test('Search for "jacket"', async () => {
    await page.goto('https://magento.softwaretestingboard.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });
  
    await page.waitForSelector('input#search', { timeout: 10000 });
    await page.type('input#search', 'jacket');
    await page.keyboard.press('Enter');
  
    await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 });
  
    const url = page.url();
    expect(url).toContain('catalogsearch/result');
  
    await page.waitForSelector('.product-items', { timeout: 10000 });
    const products = await page.$$('.product-item');
    expect(products.length).toBeGreaterThan(0);
  });
  
  
  test('Maintains session after cookie acceptance', async () => {
    await page.goto('https://magento.softwaretestingboard.com/customer/account/login', {
      waitUntil: 'domcontentloaded',
    });
  
    const cookieAccepted = await page.evaluate(() => {
      return localStorage.getItem('cookie-accepted');
    });
    expect(cookieAccepted).toBe('true');
  
    const cookies = await page.cookies();
    const session = cookies.find((cookie) => cookie.name === 'PHPSESSID');
    expect(session).not.toBeUndefined();
  });
});  