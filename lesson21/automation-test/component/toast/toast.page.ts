import {expect, Page, Locator, Frame} from '@playwright/test';

export class ToastPage {
  readonly page: Page;
  readonly frameLocator: Locator;
  frame: Frame | null = null;

  readonly successToastLocator: Locator;
  readonly failureToastLocator: Locator;

  readonly showSuccessToastButtonLocator: Locator;
  readonly showFailureToastButtonLocator: Locator;

  constructor(public readonly pageContext: Page) {
    this.page = pageContext;
    this.frameLocator = pageContext.frameLocator('iframe');

    this.successToastLocator = this.frameLocator.locator('igds-toast#toast');
    this.failureToastLocator = this.frameLocator.locator('igds-toast#toast2');

    this.showSuccessToastButtonLocator = this.frameLocator
      .locator('igds-button')
      .nth(0)
      .locator('button.button.button--primary');

    this.showFailureToastButtonLocator = this.frameLocator
      .locator('igds-button')
      .nth(1)
      .locator('button.button.button--primary');
  }

  async initFrame() {
    const iframeElement = await this.page.locator('iframe').elementHandle();
    this.frame = await iframeElement?.contentFrame();
    if (!this.frame) throw new Error('iframe not found');
  }

  async showSuccessToast() {
    await this.initFrame();
    await expect(this.showSuccessToastButtonLocator).toBeVisible();
    await this.showSuccessToastButtonLocator.click();
  }

  async showFailureToast() {
    await this.initFrame();
    await expect(this.showFailureToastButtonLocator).toBeVisible();
    await this.showFailureToastButtonLocator.click();
  }

  async closeSuccessToast() {
    await this.closeToast(this.successToastLocator);
  }

  async closeFailureToast() {
    await this.closeToast(this.failureToastLocator);
  }

  async waitForSuccessToastVisible() {
    await expect(this.successToastLocator).toBeVisible({timeout: 10000});
  }

  async waitForFailureToastVisible() {
    await expect(this.failureToastLocator).toBeVisible({timeout: 10000});
  }

  async hasAnyTextInSuccessToast(): Promise<boolean> {
    const handle = await this.successToastLocator.elementHandle();
    if (!handle) throw new Error('Success toast handle not found');
    const text = await handle.evaluate(
      (el) => el.shadowRoot?.textContent?.trim() || ''
    );
    console.log('[hasAnyTextInSuccessToast] Extracted text:', text);
    return !!text;
  }

  async hasAnyTextInFailureToast(): Promise<boolean> {
    const handle = await this.failureToastLocator.elementHandle();
    if (!handle) throw new Error('Failure toast handle not found');
    const text = await handle.evaluate(
      (el) => el.shadowRoot?.textContent?.trim() || ''
    );
    console.log('[hasAnyTextInFailureToast] Extracted text:', text);
    return !!text;
  }

  private async closeToast(toastLocator: Locator) {
    const elementHandle = await toastLocator.elementHandle();
    if (!elementHandle) throw new Error('Toast element handle not found');
    const closeButtonHandle = await elementHandle.evaluateHandle(
      (toast: HTMLElement) => toast.shadowRoot?.querySelector('igds-button')
    );
    const closeButton = closeButtonHandle?.asElement();
    if (!closeButton) throw new Error('Close button element not found');
    await closeButton.click();
  }
}
