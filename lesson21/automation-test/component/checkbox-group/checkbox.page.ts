import {Locator, Page, expect} from '@playwright/test';

export class CheckboxPage {
  readonly page: Page;
  readonly frame: Locator;

  readonly checkboxes: Locator;
  readonly withInput: Locator;
  readonly boxInput: Locator;
  readonly textInput: Locator;
  readonly form: Locator;
  readonly submit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frame = page.frameLocator('iframe');

    this.form = this.frame.locator('form');
    this.checkboxes = this.frame.locator(
      'igds-checkbox >> input[type="checkbox"]'
    );

    this.withInput = this.form.locator('igds-checkbox[variant="with-input"]');
    this.boxInput = this.withInput.locator('input[type="checkbox"]');
    this.textInput = this.withInput.locator(
      'input[type="text"], input.checkbox__option-input'
    );

    this.submit = this.form.locator('igds-button[type="submit"]');
  }

  async waitForReady() {
    await expect(this.form).toBeVisible();
    await expect(this.checkboxes.first()).toBeVisible();
  }

  async getCount() {
    return this.checkboxes.count();
  }
  async isChecked(i: number) {
    return this.checkboxes.nth(i).isChecked();
  }
  async toggle(i: number) {
    await this.checkboxes.nth(i).click();
  }
  async spaceToggle(i: number) {
    await this.checkboxes.nth(i).focus();
    await this.page.keyboard.press('Space');
  }
  async fillText(v: string) {
    await this.textInput.fill(v);
  }
  async submitForm() {
    await this.submit.click();
  }
}
