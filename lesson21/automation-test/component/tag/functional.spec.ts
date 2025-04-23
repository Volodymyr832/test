import {test, expect} from '@playwright/test';
import {TagGroupPage} from './tag.page';
import {openStory} from '../../../automation-test/utils/storybook';
import {storyPaths} from '../../../automation-test/utils/storyPaths';

test.describe('Tag Functional Tests', () => {
  test.describe('In Tag Group', () => {
    let tagGroup: TagGroupPage;

    test.beforeEach(async ({page}) => {
      const loadedPage = await openStory(page, storyPaths.tag.inTagGroup);
      tagGroup = new TagGroupPage(loadedPage);
      await tagGroup.waitForReady();
    });

    test('DS-796 | should display all tags in group', async () => {
      const count = await tagGroup.getTagCount();
      expect(count).toBeGreaterThan(0);
    });

    test('DS-796 | should verify attributes of tags', async () => {
      const attributes = await tagGroup.getAllTagAttributes();
      expect(attributes.length).toBeGreaterThan(0);

      for (const attr of attributes) {
        expect(attr).toHaveProperty('icon');
        expect(attr).toHaveProperty('removable');
        expect(attr).toHaveProperty('disabled');
      }
    });
  });
});
