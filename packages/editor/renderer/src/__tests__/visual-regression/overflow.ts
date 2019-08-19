import { snapshot, initRendererWithADF } from './_utils';
import * as document from '../../../examples/helper/overflow.adf.json';
import { Page } from 'puppeteer';

const initRenderer = async (page: Page, adf: any) => {
  await initRendererWithADF(page, {
    appearance: 'full-page',
    viewport: { width: 1280, height: 900 },
    adf,
  });
};

describe('Snapshot Test: Overflow shadows', () => {
  let page: Page;
  beforeAll(() => {
    // @ts-ignore
    page = global.page;
  });

  afterEach(async () => {
    await page.waitFor(1000); // wait overflow shadow to render.
    await snapshot(page);
  });

  it(`should render right shadows`, async () => {
    await initRenderer(page, document);
  });
});
