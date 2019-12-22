import {
  getExampleUrl,
  navigateToUrl,
  disableAllSideEffects,
} from '@atlaskit/visual-regression/helper';
import { Page } from 'puppeteer';
import { snapshot, animationFrame } from './_utils';

describe('Snapshot Test: WidthProvider', () => {
  let page: Page;
  beforeAll(() => {
    // @ts-ignore
    page = global.page;
  });

  afterEach(async () => {
    await animationFrame(page);
    await snapshot(page);
  });

  it('should resize the table breakout', async () => {
    const url = getExampleUrl(
      'editor',
      'renderer',
      'list-of-comments',
      // @ts-ignore
      global.__BASEURL__,
    );

    await navigateToUrl(page, url);
    await page.waitForSelector('#RendererOutput');
    await page.setViewport({ width: 1200, height: 1500 });
    await disableAllSideEffects(page, false);
  });
});
