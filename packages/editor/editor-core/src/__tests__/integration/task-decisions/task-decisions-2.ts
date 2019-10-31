import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  expectMatchDocument,
  insertMentionUsingClick,
  editable,
  copyToClipboard,
  fullpage,
} from '../_helpers';
import {
  mountEditor,
  goToEditorTestingExample,
} from '../../__helpers/testing-example-helpers';

export const loadActionButton = '[aria-label="Action item"]';

/*
 * Safari adds special characters that end up in the snapshot
 */

// Cannot paste rich text in IE/Edge
BrowserTestCase(
  'task-decision-2.ts: can paste rich text into an action',
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
    await browser.type(editable, '[] ');
    await browser.waitForSelector('div[data-node-type="actionList"]');
    await browser.paste(editable);
    await expectMatchDocument(browser, testName);
  },
);

// TODO: fix for chrome , italics is being selected on paste
// https://product-fabric.atlassian.net/browse/ED-6802
BrowserTestCase(
  'task-decision-2.ts: can paste plain text into an action',
  { skip: ['ie', 'safari', 'chrome'] },
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

    await browser.waitFor(editable);
    await browser.type(editable, '[] ');
    await browser.waitForSelector('div[data-node-type="actionList"]');
    await browser.paste(editable);
    await expectMatchDocument(browser, testName);
  },
);

// TODO: unable to type on chrome
// Safari and chrome highlights entire text on clic
// IE is generally flaky
BrowserTestCase(
  'task-decision-2.ts: can type into decision',
  { skip: ['ie', 'safari', 'edge', 'chrome'] },
  async (client: any, testName: string) => {
    const browser = await goToEditorTestingExample(client);
    await mountEditor(browser, {
      appearance: fullpage.appearance,
    });

    await browser.click(loadActionButton);
    await browser.waitForSelector(
      'div[data-node-type="actionList"] span + div',
    );
    await browser.click('div[data-node-type="actionList"] span + div');
    await browser.type(editable, 'adding action');
    await expectMatchDocument(browser, testName);
  },
);

BrowserTestCase(
  'task-decision-2.ts: can insert mention into an action using click',
  { skip: ['ie', 'safari'] },
  async (client: any, testName: string) => {
    const browser = await goToEditorTestingExample(client);
    await mountEditor(browser, {
      appearance: fullpage.appearance,
    });

    await browser.type(editable, '[] ');
    await browser.waitForSelector('div[data-node-type="actionList"]');
    await insertMentionUsingClick(browser, '0');
    await expectMatchDocument(browser, testName);
  },
);
