import { Page } from '../../__helpers/page-objects/_types';
import { snapshot, initEditorWithAdf, Appearance } from '../_utils';
import {
  resizeMediaInPosition,
  waitForMediaToBeLoaded,
  insertMedia,
} from '../../__helpers/page-objects/_media';
import { insertExpand } from '../../__helpers/page-objects/_expand';
import { toggleBreakout } from '../../__helpers/page-objects/_layouts';
import adf from './__fixtures__/breakout-nodes-with-media.adf.json';

describe('Snapshot Test: Media inside of breakout nodes', () => {
  let page: Page;

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
  });

  it('should display using the breakout node width', async () => {
    await initEditorWithAdf(page, {
      appearance: Appearance.fullPage,
      adf,
      editorProps: {
        media: {
          allowMediaSingle: true,
          allowResizing: true,
        },
        allowTables: {
          advanced: true,
        },
      },
      viewport: { width: 1280, height: 4200 },
    });
    await snapshot(page);
  });

  describe.each([
    ['wide', 1],
    ['full-width', 2],
  ])('when the layout is %s', (mode, times) => {
    it('can be resized more than the line height', async () => {
      await initEditorWithAdf(page, {
        appearance: Appearance.fullPage,
        editorProps: {
          media: {
            allowMediaSingle: true,
            allowResizing: true,
          },
          allowTables: {
            advanced: true,
          },
        },
        viewport: { width: 1280, height: 800 },
      });

      await insertExpand(page);
      await insertMedia(page);
      await waitForMediaToBeLoaded(page);
      // @ts-ignore
      await toggleBreakout(page, times);
      await resizeMediaInPosition(page, 0, 300);
      await snapshot(page);
    });
  });
});
