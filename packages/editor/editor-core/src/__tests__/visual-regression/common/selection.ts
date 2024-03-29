import { snapshot, Device, initEditorWithAdf, Appearance } from '../_utils';
import adf from './__fixtures__/nested-elements.adf.json';
import {
  tableSelectors,
  clickFirstCell,
} from '../../__helpers/page-objects/_table';
import { animationFrame } from '../../__helpers/page-objects/_editor';
import { EditorTestCardProvider } from '../../../../../editor-test-helpers';

describe('Danger for nested elements', () => {
  let page: any;
  const cardProvider = new EditorTestCardProvider();

  describe(`Full page`, () => {
    const threshold = 0.01;
    beforeAll(async () => {
      // @ts-ignore
      page = global.page;
    });

    beforeEach(async () => {
      await initEditorWithAdf(page, {
        appearance: Appearance.fullPage,
        adf,
        device: Device.LaptopHiDPI,
        editorProps: {
          UNSAFE_cards: { provider: Promise.resolve(cardProvider) },
        },
      });
      await clickFirstCell(page);
      await animationFrame(page);
    });

    afterEach(async () => {
      await animationFrame(page);
      await snapshot(page, threshold);
    });

    it(`should show danger for table and all nested elements`, async () => {
      await page.waitForSelector(tableSelectors.removeTable);
      await page.hover(tableSelectors.removeTable);
      await page.waitForSelector(tableSelectors.removeDanger);
    });
  });
});
