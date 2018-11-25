import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

import {
  editable,
  getDocFromElement,
  fullpage,
  quickInsert,
  insertBlockMenuItem,
  insertMentionUsingClick,
  navigateOrClear,
} from '../_helpers';

import { messages as insertBlockMessages } from '../../../plugins/insert-block/ui/ToolbarInsertBlock';

BrowserTestCase(
  'change-type.ts: Change the type of panel to Error',
  { skip: ['edge', 'ie'] },
  async client => {
    const browser = new Page(client);

    await navigateOrClear(browser, fullpage.path);

    await browser.waitForSelector(fullpage.placeholder);
    await browser.click(fullpage.placeholder);
    await quickInsert(browser, 'Panel');

    await browser.type(editable, 'this text should be in the panel');

    // Change panel type to Error
    const selector = `[aria-label="Error"]`;
    await browser.click(selector);

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'insert-link.ts: Insert link in panel by typing Markdown',
  { skip: ['edge', 'ie'] },
  async client => {
    const browser = new Page(client);

    await navigateOrClear(browser, fullpage.path);

    await browser.waitForSelector(fullpage.placeholder);
    await browser.click(fullpage.placeholder);

    await quickInsert(browser, 'Panel');

    await browser.type(editable, '[Atlassian](https://www.atlassian.com/)');

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'insert-toolbar-menu.ts: Insert panel via toolbar menu',
  { skip: ['ie'] },
  async client => {
    const browser = new Page(client);

    await navigateOrClear(browser, fullpage.path);
    await browser.waitForSelector(editable);
    await browser.click(editable);

    await insertBlockMenuItem(browser, 'Panel');

    await browser.type(editable, 'this text should be in the panel');

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'inside-table.ts: Insert panel into table, add text, change panel type',
  { skip: ['edge', 'ie'] },
  async client => {
    const insertTableMenu = `[aria-label="${
      insertBlockMessages.table.defaultMessage
    }"]`;
    const tableControls = '[aria-label="Table floating controls"]';

    const browser = new Page(client);

    await navigateOrClear(browser, fullpage.path);
    await browser.waitForSelector(editable);
    await browser.click(editable);
    await browser.click(insertTableMenu);
    await browser.waitForSelector(tableControls);

    await quickInsert(browser, 'Panel');

    // type some text
    await browser.type(editable, 'this text should be in the panel');

    // click on Error label
    const selector = `[aria-label="Error"]`;
    await browser.click(selector);

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
    expect(await browser.isExisting(tableControls)).toBe(false);
    expect(await browser.isVisible(tableControls)).toBe(false);
  },
);

BrowserTestCase(
  'mention.ts: Can insert mention inside panel using click',
  { skip: ['ie', 'edge', 'safari'] },
  async client => {
    const browser = new Page(client);

    await navigateOrClear(browser, fullpage.path);
    await browser.waitFor(editable);
    await browser.click(editable);
    await quickInsert(browser, 'Panel');

    await insertMentionUsingClick(browser, '0');
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  'quick-insert.ts: Insert panel via quick insert',
  { skip: ['edge', 'ie'] },
  async client => {
    const browser = new Page(client);

    await navigateOrClear(browser, fullpage.path);
    await browser.waitForSelector(editable);
    await browser.click(editable);
    await quickInsert(browser, 'Panel');

    await browser.type(editable, 'this text should be in the panel');

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
