import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import {
  editable,
  expectMatchDocument,
  comment,
  insertMedia,
} from '../_helpers';
import {
  mountEditor,
  goToEditorTestingExample,
} from '../../__helpers/testing-example-helpers';

[comment].forEach(editor => {
  BrowserTestCase(
    `insert-mediaGroup.ts: Inserts a media group on ${editor.name}`,
    { skip: ['edge', 'ie', 'safari'] },
    async (client: any, testName: string) => {
      const page = await goToEditorTestingExample(client);
      await mountEditor(page, {
        appearance: editor.appearance,
        media: {
          allowMediaSingle: false,
          allowMediaGroup: true,
        },
      });

      await page.click(editable);
      await page.type(editable, 'some text');

      // now we can insert media as necessary
      await insertMedia(page);

      expect(await page.isVisible('.wrapper')).toBe(true);

      await expectMatchDocument(page, testName);
    },
  );
});
