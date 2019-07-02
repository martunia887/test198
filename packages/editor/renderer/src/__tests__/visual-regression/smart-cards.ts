import { snapshot, initRendererWithADF } from './_utils';
import * as document from '../../../examples/helper/smart-card.adf.json';
import { Page } from 'puppeteer';

const initRenderer = async (page: Page, adf: any) => {
  await initRendererWithADF(page, {
    appearance: 'full-page',
    viewport: { width: 1280, height: 1080 },
    adf,
  });
};

describe('Snapshot Test: Smart cards', () => {
  let page: Page;
  beforeAll(() => {
    // @ts-ignore
    page = global.page;
  });

  afterEach(async () => {
    await snapshot(page);
  });

  it(`should render right smart cards`, async () => {
    await initRenderer(page, document);
  });
});
