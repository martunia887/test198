import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  expectMatchDocument,
  comment,
  fullpage,
  editable,
  linkToolbar,
} from '../_helpers';
import { messages } from '../../../plugins/insert-block/ui/ToolbarInsertBlock';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

const linkText1 = 'http://hello.com ';
const linkText2 = 'FAB-983';

// https://product-fabric.atlassian.net/browse/ED-4162 - Firefox
// Floating toolbar is not showin up on IE and edge
[comment, fullpage].forEach(editor => {
  BrowserTestCase(
    `hyperlink-text.ts: Link: edit text to display with ${editor.name} editor`,
    {
      skip: ['ie', 'edge', 'safari', 'firefox'],
    },
    async (client: any, testName: string) => {
      const textToDisplayInput = '[placeholder="Text to display"]';
      const browser = await goToEditorTestingExample(client);
      await mountEditor(browser, { appearance: editor.appearance });

      await browser.click(`[aria-label="${messages.link.defaultMessage}"]`);
      await browser.waitForSelector(linkToolbar);
      await browser.type(linkToolbar, [linkText2, 'Return']);
      await browser.waitForSelector('a');

      // unlink
      await browser.type(editable, [
        'Return',
        linkText1,
        'ArrowLeft',
        'ArrowLeft',
      ]);
      await browser.waitForSelector('[aria-label="Edit link"]');
      await browser.click('[aria-label="Edit link"]');

      await browser.waitForSelector(textToDisplayInput);
      await browser.type(textToDisplayInput, 'mmm');
      await browser.type(textToDisplayInput, 'Return');
      await expectMatchDocument(browser, testName);
    },
  );

  BrowserTestCase(
    `hyperlink-text.ts: Link:edit with ${editor.name} editor`,
    {
      skip: ['ie', 'edge', 'safari', 'firefox'],
    },
    async (client: any, testName: string) => {
      const textToDisplayInput = '[placeholder="Text to display"]';
      const browser = await goToEditorTestingExample(client);
      await mountEditor(browser, { appearance: editor.appearance });

      await browser.click(`[aria-label="${messages.link.defaultMessage}"]`);
      await browser.waitForSelector(linkToolbar);
      await browser.type(linkToolbar, [linkText2, 'Return']);
      await browser.waitForSelector('a');

      await browser.type(editable, ['ArrowLeft', 'ArrowLeft']);
      await browser.waitForSelector('[aria-label="Edit link"]');
      await browser.click('[aria-label="Edit link"]');

      await browser.waitForSelector(textToDisplayInput);
      await browser.type(textToDisplayInput, 'mmm');
      await browser.type(textToDisplayInput, 'Return');
      await expectMatchDocument(browser, testName);
    },
  );
});
