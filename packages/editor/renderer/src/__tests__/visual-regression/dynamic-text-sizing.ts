import { MINIMUM_THRESHOLD } from '@atlaskit/visual-regression/helper';
import { snapshot, initRendererWithADF } from './_utils';
import * as document from '../__fixtures__/document-without-media.adf.json';
import { Page } from 'puppeteer';

const initRenderer = async (
  page: Page,
  viewport: { width: number; height: number },
) => {
  await initRendererWithADF(page, {
    appearance: 'full-page',
    viewport,
    rendererProps: { allowDynamicTextSizing: true },
    adf: document,
  });
};

describe('Snapshot Test: Dynamic Text Sizing', () => {
  let page: Page;
  beforeAll(() => {
    // @ts-ignore
    page = global.page;
  });

  afterEach(async () => {
    await page.waitFor(100); // wait for dynamic text sizing to occur
    await snapshot(page, MINIMUM_THRESHOLD);
  });

  [
    { width: 1440, height: 3200 },
    { width: 1120, height: 3000 },
    { width: 1000, height: 3000 },
  ].forEach(viewport => {
    it(`should correctly render ${viewport.width}`, async () => {
      await initRenderer(page, viewport);
    });
  });
});
