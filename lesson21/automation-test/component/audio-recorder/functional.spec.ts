import {test, expect} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {AudioRecorderPage} from './audio-recorder.page';
import {storyPaths} from '../../utils/storyPaths';

test.describe('Audio Recorder Functional Tests', () => {
  let audioRecorder: AudioRecorderPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.audioRecorder.default);
    audioRecorder = new AudioRecorderPage(loadedPage);
    await audioRecorder.waitForReady();
  });

  test('DS-404 | should start recording on button click', async () => {
    await audioRecorder.startRecording();

    await expect
      .poll(
        async () => {
          return audioRecorder.isRecordingActive();
        },
        {
          timeout: 5000,
        }
      )
      .toBe(true);
  });
});
