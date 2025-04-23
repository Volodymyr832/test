import {test, expect} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {AudioRecorderPage} from './audio-recorder.page';
import {storyPaths} from '../../utils/storyPaths';

test.describe('Audio Recorder Accessibility Tests', () => {
  let audioRecorder: AudioRecorderPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.audioRecorder.default);
    audioRecorder = new AudioRecorderPage(loadedPage);
    await audioRecorder.waitForReady();
  });

  test('DS-405 | should have accessible label and role', async () => {
    await expect(audioRecorder.recorderButton).toHaveAttribute(
      'aria-label',
      /audio recorder/i
    );
    await expect(audioRecorder.recorderButton).toHaveAttribute(
      'role',
      'status'
    );
  });
});
