import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { comment, fullpage, editable, linkToolbar } from '../_helpers';
import { messages } from '../../../plugins/insert-block/ui/ToolbarInsertBlock';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

const linkText1 = 'http://hello.com ';

// https://product-fabric.atlassian.net/browse/ED-4162 - Firefox
// Floating toolbar is not showin up on IE and edge
[comment, fullpage].forEach(editor => {
  BrowserTestCase(
    `hyperlink-toolbar.ts: Link: Empty text to display when link href is same as text`,
    {
      skip: ['ie', 'edge', 'safari', 'firefox'],
    },
    async (client: any) => {
      const textToDisplayInput = '[placeholder="Text to display"]';
      let browser = await goToEditorTestingExample(client);
      await mountEditor(browser, { appearance: editor.appearance });

      await browser.click(`[aria-label="${messages.link.defaultMessage}"]`);
      await browser.waitForSelector(linkToolbar);
      await browser.waitForSelector('a');

      await browser.type(editable, [
        'Return',
        linkText1,
        'Return',
        'ArrowLeft',
        'ArrowLeft',
      ]);
      await browser.waitForSelector('[aria-label="Edit link"]');
      await browser.click('[aria-label="Edit link"]');

      await browser.waitForSelector(textToDisplayInput);
      const elem = await browser.getText(textToDisplayInput);
      expect(elem).toEqual('');
    },
  );
});
