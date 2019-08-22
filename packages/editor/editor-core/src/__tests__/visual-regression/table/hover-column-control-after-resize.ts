import { snapshot, initFullPageEditorWithAdf, Device } from '../_utils';
import adf from '../common/__fixtures__/noData-adf.json';
import {
  resizeColumn,
  insertTable,
  hoverColumnControls,
  insertColumn,
  clickFirstCell,
} from '../../__helpers/page-objects/_table';
import { animationFrame } from '../../__helpers/page-objects/_editor';

describe('Snapshot Test: table resizing', () => {
  describe('Re-sizing', () => {
    let page: any;
    beforeEach(async () => {
      // @ts-ignore
      page = global.page;
      await initFullPageEditorWithAdf(page, adf, Device.LaptopHiDPI);
      await insertTable(page);
    });

    it('should hover the right column after resize', async () => {
      await insertColumn(page, 1, 'right');
      await insertColumn(page, 1, 'right');
      await insertColumn(page, 1, 'right');
      await insertColumn(page, 1, 'right');
      await clickFirstCell(page);
      await resizeColumn(page, { colIdx: 1, amount: -130, row: 2 });
      await animationFrame(page);
      await animationFrame(page);
      await resizeColumn(page, { colIdx: 3, amount: -130, row: 2 });
      await animationFrame(page);
      await animationFrame(page);
      await hoverColumnControls(page, 6, 'right');

      await snapshot(page);
    });
  });
});
