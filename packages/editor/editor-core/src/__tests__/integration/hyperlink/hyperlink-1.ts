import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import {
  expectMatchDocument,
  comment,
  fullpage,
  editable,
  linkToolbar,
} from '../_helpers';
import { messages } from '../../../plugins/insert-block/ui/ToolbarInsertBlock';
import {
  mountEditor,
  goToEditorTestingExample,
} from '../../__helpers/testing-example-helpers';

const linkText1 = 'http://hello.com ';
const linkText2 = 'FAB-983';

// https://product-fabric.atlassian.net/browse/ED-4162 - Firefox
// Floating toolbar is not showin up on IE and edge
[comment, fullpage].forEach(editor => {
  BrowserTestCase(
    `hyperlink-1.ts: Link:create link using toolbar,unlinkify ${
      editor.name
    } editor`,
    {
      skip: ['ie', 'edge', 'safari', 'firefox'],
    },
    async (client: any, testName: string) => {
      const browser = await goToEditorTestingExample(client);
      await mountEditor(browser, { appearance: 'full-page' });

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
      await browser.waitForSelector('[aria-label=Unlink]');
      await browser.click('[aria-label=Unlink]');

      await expectMatchDocument(browser, testName);
    },
  );
});
