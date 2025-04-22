import {Page, Locator, FrameLocator, expect} from '@playwright/test';

export class AudioRecorderPage {
  readonly page: Page;
  readonly frame: FrameLocator;
  readonly recorderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frame = page.frameLocator('iframe');
    this.recorderButton = this.frame.locator('button.audio-recorder');
  }

  async waitForReady() {
    await expect(this.recorderButton).toBeVisible({timeout: 10000});
  }

  async startRecording() {
    await this.recorderButton.click();
  }

  async isRecordingActive(): Promise<boolean> {
    return await this.recorderButton.evaluate((button) =>
      button.classList.contains('audio-recorder--active')
    );
  }

  async snapshot(name: string) {
    const screenshot = await this.frame.locator('body').screenshot();
    expect(screenshot).toMatchSnapshot(name);
  }
}
