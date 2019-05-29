import {
  initFullPageEditorWithAdf,
  snapshot,
  Device,
  deviceViewPorts,
} from '../_utils';
import tableIn2ColAdf from './__fixtures__/table-in-2-col-layout.adf.json';
import { Page } from '../../__helpers/page-objects/_types';
import { messages } from '../../../plugins/layout/toolbar';
import { clickFirstCell } from '../../../__tests__/__helpers/page-objects/_table';

describe('Snapshot Test: Nested table inside layouts', () => {
  let page: Page;

  const { rightSidebar, leftSidebar, threeColumns } = messages;
  const layoutBtns = [
    rightSidebar.defaultMessage,
    leftSidebar.defaultMessage,
    threeColumns.defaultMessage,
  ];

  const initEditor = async (
    viewport: { height: number; width: number } = deviceViewPorts[
      Device.LaptopHiDPI
    ],
  ) => {
    await initFullPageEditorWithAdf(page, tableIn2ColAdf, undefined, viewport, {
      allowLayouts: { allowBreakout: true, UNSAFE_addSidebarLayouts: true },
      allowDynamicTextSizing: true,
    });
  };

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
  });

  afterEach(async () => {
    await snapshot(page);
  });

  // want one size above and one below dynamic text sizing breakpoint (1265px)
  [deviceViewPorts[Device.LaptopHiDPI], { width: 1260, height: 800 }].forEach(
    viewport => {
      describe(`${viewport.width}x${
        viewport.height
      }: resizing table when changing layout`, () => {
        beforeEach(async () => {
          await initEditor(viewport);
        });
        layoutBtns.forEach(layout => {
          const layoutBtnSelector = `[aria-label="${layout}"]`;

          it(`should resize when changing to ${layout}`, async () => {
            await page.click(layoutBtnSelector);
            await clickFirstCell(page);
          });
        });
      });
    },
  );

  describe('breakout modes', () => {
    beforeEach(async () => {
      await initEditor();
      await clickFirstCell(page);
    });
    ['wide', 'full-width'].forEach((breakout, idx) => {
      it(`should display correctly for layout in ${breakout} breakout mode`, async () => {
        const breakoutBtnSelector = '[data-editor-popup]';
        for (let i = 1; i <= idx + 1; i++) {
          await page.click(breakoutBtnSelector);
        }
        await clickFirstCell(page);
      });
    });
  });

  it('should display correctly when columns are stacked', async () => {
    await initEditor(deviceViewPorts[Device.iPad]);
    await clickFirstCell(page);
  });
});
