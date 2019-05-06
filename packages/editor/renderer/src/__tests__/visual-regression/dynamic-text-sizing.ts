import { snapshot, mountRenderer, goToRendererTestingExample } from './_utils';
import { document } from './__fixtures__/document-without-media';
import { Page } from 'puppeteer';
import { waitForLoadedBackgroundImages } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test: Dynamic Text Sizing', () => {
  let page: Page;
  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await goToRendererTestingExample(page);
  });

  [
    { width: 1440, height: 3200 },
    { width: 1120, height: 3000 },
    { width: 1000, height: 3000 },
  ].forEach(size => {
    it(`should correctly render ${size.width}`, async () => {
      await page.setViewport(size);
      await page.waitFor(100);
      await mountRenderer(page, {
        appearance: 'full-page',
        allowDynamicTextSizing: true,
        document,
      });
      await waitForLoadedBackgroundImages(
        page,
        '.emoji-common-emoji-sprite',
        10000,
      );
      await snapshot(page);
    });
  });
});
