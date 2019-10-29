import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import { expectMatchDocument, comment, fullpage, editable } from '../_helpers';

[comment, fullpage].forEach(editor => {
  BrowserTestCase(
    `hyperlink-markdown: Link - entering link markdown ${editor.name} editor`,
    {
      skip: ['ie', 'edge', 'safari'],
    },
    async (client: any, testName: string) => {
      let browser = new Page(client);
      await browser.goto(editor.path);
      await browser.waitForSelector(editor.placeholder);
      await browser.click(editor.placeholder);
      await browser.waitForSelector(editable);

      await browser.type(editable, ['[link](https://hello.com)']);
      await browser.waitForSelector('a');

      await expectMatchDocument(page, testName);
    },
  );
});
