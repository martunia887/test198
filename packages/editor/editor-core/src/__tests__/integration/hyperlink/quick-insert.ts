import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import {
  editable,
  expectMatchDocument,
  fullpage,
  quickInsert,
  linkToolbar,
} from '../_helpers';
import {
  mountEditor,
  goToEditorTestingExample,
} from '../../__helpers/testing-example-helpers';

BrowserTestCase(
  'quick-insert.ts: Insert hyperlink via quick insert',
  { skip: ['ie', 'edge', 'safari'] },
  async (client: any, testName: string) => {
    let browser = await goToEditorTestingExample(client);
    await mountEditor(browser, { appearance: 'full-page' });

    await browser.goto(fullpage.path);
    await browser.waitForSelector(editable);
    await browser.click(editable);
    await quickInsert(browser, 'Link');

    await browser.waitForSelector(linkToolbar);
    await browser.type(linkToolbar, ['google.com']);
    await browser.keys(['Return']);
    await browser.waitForSelector('a');

    await expectMatchDocument(browser, testName);
  },
);
