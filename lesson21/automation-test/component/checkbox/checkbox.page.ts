import {Locator, Page, expect} from '@playwright/test';

export class CheckboxPage {
  readonly page: Page;
  readonly frameLocator: Locator;
  readonly component: Locator;
  readonly input: Locator;
  readonly label: Locator;
  readonly textInput: Locator;
  readonly submit: Locator;
  readonly form: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frameLocator = page.frameLocator('iframe');
    this.component = this.frameLocator.locator('igds-checkbox');
    this.input = this.component.locator('input[type="checkbox"]');
    this.label = this.component.locator('slot[name="checkbox-label"]');

    this.form = this.frameLocator.locator('form');
    const checkboxComponent = this.form.locator(
      'igds-checkbox[variant="with-input"]'
    );
    this.textInput = checkboxComponent.locator(
      'input[type="text"], input.checkbox__option-input'
    );
    this.submit = this.form.locator('igds-button[type="submit"]');
  }

  async waitForReady(): Promise<void> {
    await expect(this.input).toBeVisible();
  }

  async isChecked(): Promise<boolean> {
    return await this.input.isChecked();
  }

  async fillText(value: string) {
    await this.textInput.fill(value);
  }

  async isDisabled(): Promise<boolean> {
    return await this.input.isDisabled();
  }

  async isAriaInvalid(): Promise<boolean> {
    return (await this.input.getAttribute('aria-invalid')) === 'true';
  }

  async toggle(): Promise<void> {
    await this.input.click();
  }

  async toggleWithKeyboard(): Promise<void> {
    await this.input.focus();
    await this.page.keyboard.press('Space');
  }

  async getLabelText(): Promise<string> {
    return (await this.label.textContent())?.trim() ?? '';
  }

  async submitForm(): Promise<void> {
    await this.submit.click();
  }
}
