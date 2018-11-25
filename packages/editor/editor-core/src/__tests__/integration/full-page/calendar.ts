import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import { messages } from '../../../plugins/insert-block/ui/ToolbarInsertBlock';
import { navigateOrClear, fullpage, editable } from '../_helpers';

const insertMenu = `[aria-label="${messages.insertMenu.defaultMessage}"]`;
const dateMenu = `span=${messages.date.defaultMessage}`;
const calendar = '[aria-label="calendar"]';
const dateView = `span.dateView-content-wrap`;

// https://product-fabric.atlassian.net/browse/ED-4531
BrowserTestCase(
  'calendar.ts: user should be able to open calendar',
  { skip: ['edge', 'ie', 'safari'] },
  async client => {
    const browser = new Page(client);

    await navigateOrClear(browser, fullpage.path);
    await browser.waitForSelector(editable);
    await browser.click(editable);
    await browser.click(insertMenu);
    await browser.click(dateMenu);
    await browser.waitForSelector(calendar);
    expect(await browser.isExisting(calendar)).toBe(true);
    await browser.click(editable);
    expect(await browser.isExisting(calendar)).toBe(false);
  },
);

// https://product-fabric.atlassian.net/browse/ED-5033
BrowserTestCase(
  'calendar.ts: clicking date when calendar is open should close it',
  { skip: ['edge', 'ie', 'safari'] },
  async client => {
    const browser = new Page(client);

    await navigateOrClear(browser, fullpage.path);
    await browser.waitForSelector(editable);
    await browser.click(editable);
    await browser.click(insertMenu);
    await browser.click(dateMenu);
    await browser.waitForSelector(calendar);
    expect(await browser.isExisting(calendar)).toBe(true);
    await browser.waitForSelector(dateView);
    await browser.click(dateView);
    // wait for element to disappear
    await browser.waitFor(calendar, '5000', true);
    expect(await browser.isExisting(calendar)).toBe(false);
  },
);

BrowserTestCase(
  'calendar.ts: clicking on another date should open its date picker',
  { skip: ['edge', 'ie', 'safari'] },
  async client => {
    const browser = new Page(client);

    await navigateOrClear(browser, fullpage.path);
    await browser.waitForSelector(editable);
    await browser.click(editable);
    await browser.click(insertMenu);
    await browser.click(dateMenu);
    expect(await browser.isExisting(calendar)).toBe(true);

    await browser.type(editable, ['ArrowRight', 'ArrowRight']);
    await browser.click(insertMenu);
    await browser.click(dateMenu);
    expect(await browser.isExisting(calendar)).toBe(true);

    await browser.waitForSelector(dateView);
    await browser.click(dateView);
    expect(await browser.isExisting(calendar)).toBe(true);
  },
);
