import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

/* Url to test the example */
const urlBadge = getExampleUrl('core', 'label', 'testing');

/* Css selectors used for the test */
const myBadgeAdded = "[data-testid='myBadgeAdded']";
const myBadgeDefault = "[data-testid='myBadgeDefault']";
const myBadgeImportant = "[data-testid='myBadgeImportant']";
const myBadgePrimary = "[data-testid='myBadgePrimary']";

BrowserTestCase(
  'Badge should be identified and visible by data-testid',
  {} as any,
  async (client: any) => {
    const page = new Page(client);
    await page.goto(urlBadge);
    await page.waitFor(myBadgeAdded, 5000);
    expect(await page.isVisible(myBadgeAdded)).toBe(true);
    expect(await page.isVisible(myBadgeDefault)).toBe(true);
    expect(await page.isVisible(myBadgeImportant)).toBe(true);
    expect(await page.isVisible(myBadgePrimary)).toBe(true);
    expect(await page.getText(myBadgeAdded)).toBe('2');
    expect(await page.getText(myBadgeDefault)).toBe('67');
    expect(await page.getText(myBadgeImportant)).toBe('20');
    expect(await page.getText(myBadgePrimary)).toBe('19');
  },
);
