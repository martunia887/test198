import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  expectMatchDocument,
  editable,
  insertBlockMenuItem,
  copyToClipboard,
  fullpage,
  quickInsert,
} from '../_helpers';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

/*
 * Safari adds special characters that end up in the snapshot
 */

// Cannot paste rich text in IE/Edge
BrowserTestCase(
  'task-decision-1.ts: can paste rich text into a decision',
  { skip: ['ie', 'safari', 'edge'] },
  async (client: any, testName: string) => {
    const browser = new Page(client);
    await copyToClipboard(
      browser,
      '<p>this is a link <a href="http://www.google.com">www.google.com</a></p><p>more elements with some <strong>format</strong></p><p>some addition<em> formatting</em></p>',
      'html',
    );
    await goToEditorTestingExample(client, browser);
    await mountEditor(browser, {
      appearance: fullpage.appearance,
    });
    await browser.type(editable, '<> ');
    await browser.waitForSelector('ol');
    await browser.paste(editable);
    await expectMatchDocument(browser, testName);
  },
);

BrowserTestCase(
  'task-decision-1.ts: can paste plain text into a decision',
  { skip: ['ie', 'safari'] },
  async (client: any, testName: string) => {
    const browser = new Page(client);
    await copyToClipboard(
      browser,
      'this is a link http://www.google.com more elements with some **format** some addition *formatting*',
    );
    await goToEditorTestingExample(client, browser);
    await mountEditor(browser, {
      appearance: fullpage.appearance,
    });
    await browser.type(editable, '<> ');
    await browser.waitForSelector('ol');
    await browser.paste(editable);
    await expectMatchDocument(browser, testName);
  },
);

// Safari highlights entire text on click
// IE is generally flaky
BrowserTestCase(
  'task-decision-1.ts: can type into decision',
  { skip: ['ie', 'safari', 'edge'] },
  async (client: any, testName: string) => {
    const browser = await goToEditorTestingExample(client);
    await mountEditor(browser, {
      appearance: fullpage.appearance,
      allowTasksAndDecisions: true,
    });
    await quickInsert(browser, 'Decision');
    await browser.waitForSelector('ol span + div');
    await browser.click('ol span + div');
    await browser.type(editable, 'adding decisions');
    await expectMatchDocument(browser, testName);
  },
);
