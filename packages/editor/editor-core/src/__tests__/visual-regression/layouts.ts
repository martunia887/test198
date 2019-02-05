import { initFullPageEditorWithAdf, snapshot } from './_utils';
import * as column2 from './adf-data/column-2.json';
import * as column3 from './adf-data/column-3.json';

// TODO: add insert columns integration tests
describe('Snapshot Test: Layouts', () => {
  let page;
  beforeEach(async () => {
    // @ts-ignore
    page = global.page;
  });

  describe('Snapshot Test: Breakout', () => {
    it('should correctly render 2 layout for 1100X500', async () => {
      await page.setViewport({ width: 1100, height: 500 });
      await initFullPageEditorWithAdf(page, column2);
      await snapshot(page);
    });

    it('should correctly render 2 layout for 600X500', async () => {
      await page.setViewport({ width: 600, height: 500 });
      await initFullPageEditorWithAdf(page, column2);
      await snapshot(page);
    });

    it('should correctly render 3 layout for 600X500', async () => {
      await page.setViewport({ width: 600, height: 500 });
      await initFullPageEditorWithAdf(page, column3);
      await snapshot(page);
    });

    it('should correctly render 3 layout for 1100X500', async () => {
      await page.setViewport({ width: 1100, height: 500 });
      await initFullPageEditorWithAdf(page, column3);
      await snapshot(page);
    });
  });
});
