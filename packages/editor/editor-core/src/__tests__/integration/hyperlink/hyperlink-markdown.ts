import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { expectMatchDocument, comment, fullpage, editable } from '../_helpers';
import {
  mountEditor,
  goToEditorTestingExample,
} from '../../__helpers/testing-example-helpers';

[comment, fullpage].forEach(editor => {
  BrowserTestCase(
    `hyperlink-markdown: Link - entering link markdown ${editor.name} editor`,
    {
      skip: ['ie', 'edge', 'safari'],
    },
    async (client: any, testName: string) => {
      let browser = await goToEditorTestingExample(client);
      await mountEditor(browser, { appearance: 'full-page' });

      await browser.type(editable, ['[link](https://hello.com)']);
      await browser.waitForSelector('a');

      await expectMatchDocument(browser, testName);
    },
  );
});
