import { initFullPageEditorWithAdf, snapshot } from '../_utils';
import dynamicTextExample from './__fixtures__/dynamic-text-adf.json';

describe('Dynamic Text Sizing', () => {
  let page: any;
  // move this to the test since its used only here
  const dynamicTextViewportSizes = [
    { width: 768, height: 4500 },
    { width: 1024, height: 5000 },
    { width: 1280, height: 5500 },
    { width: 1440, height: 6000 },
  ];
  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await initFullPageEditorWithAdf(page, dynamicTextExample);
  });

  dynamicTextViewportSizes.forEach(size => {
    it(`should correctly render ${size.width}`, async () => {
      await page.setViewport(size);
      await page.waitFor(100);
      await snapshot(page, 10);
    });
  });
});
