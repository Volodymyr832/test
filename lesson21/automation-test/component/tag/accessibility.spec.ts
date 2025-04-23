import {test, expect} from '@playwright/test';
import {openStory} from '../../utils/storybook';
import {storyPaths} from '../../utils/storyPaths';
import {TagGroupPage} from './tag.page';

test.describe('Tag Accessibility', () => {
  let tagGroup: TagGroupPage;

  test.beforeEach(async ({page}) => {
    const loadedPage = await openStory(page, storyPaths.tag.inTagGroup);
    tagGroup = new TagGroupPage(loadedPage);
    await tagGroup.waitForReady();
  });

  test('DS-798 |should log all roles', async () => {
    const count = await tagGroup.getTagCount();
    const roles = [];

    for (let i = 0; i < count; i++) {
      const role = await tagGroup.getTagRole(i);
      roles.push(role);
    }

    console.log('[roles snapshot]', roles);
    expect(roles.every((r) => r === 'listitem')).toBeTruthy();
  });
});
