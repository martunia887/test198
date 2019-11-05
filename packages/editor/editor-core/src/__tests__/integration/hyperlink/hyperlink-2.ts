import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  expectMatchDocument,
  comment,
  fullpage,
  editable,
  copyToClipboard,
} from '../_helpers';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

[comment, fullpage].forEach(editor => {
  BrowserTestCase(
    `hyperlink-2.ts: Link - paste link and add text, paste link into list for ${
      editor.name
    } editor`,
    { skip: ['edge', 'ie', 'safari'] },
    async (client: any, testName: string) => {
      const sample = new Page(client);
      const linkText1 = 'https://www.google.com';
      await copyToClipboard(
        sample,
        `<a href="${linkText1}">${linkText1}</a>`,
        'html',
      );
      await goToEditorTestingExample(client, sample);
      await mountEditor(sample, {
        appearance: editor.appearance,
        allowLists: true,
      });

      await sample.paste();
      await sample.type(editable, '.');
      await sample.keys(['Return']);

      // paste link into list
      await sample.type(editable, '* ');
      await sample.waitForSelector('li');
      await sample.paste();

      await sample.waitForSelector('a');
      await expectMatchDocument(sample, testName);
    },
  );
});
