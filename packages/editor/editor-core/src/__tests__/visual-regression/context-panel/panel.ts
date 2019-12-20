import { snapshot, initEditorWithAdf, Appearance } from '../_utils';

import adfWithMixedContent from '../common/__fixtures__/with-content.json';
import { Page } from '../../__helpers/page-objects/_types';
import { scrollToTop } from '../../__helpers/page-objects/_editor';

describe('Context panel', () => {
  let page: Page;

  const initEditor = async (
    adf: any,
    appearance: Appearance,
    width = 2000,
    height = 800,
  ) => {
    await initEditorWithAdf(page, {
      appearance,
      adf,
      viewport: { width, height },
      withContextPanel: true,
    });
  };

  const widths = [2000, 500];
  widths.forEach(width => {
    describe(`full page (${width}px)`, () => {
      beforeEach(async () => {
        // @ts-ignore
        page = global.page;
      });

      it('should display show sidebar with content correctly', async () => {
        await initEditor(adfWithMixedContent, Appearance.fullPage, width);
        await scrollToTop(page);
        await snapshot(page, {}, 'body');
      });
    });
  });

  widths.forEach(width => {
    describe(`full width mode (${width}px)`, () => {
      beforeEach(async () => {
        // @ts-ignore
        page = global.page;
      });

      it('should display show sidebar with content correctly', async () => {
        await initEditor(adfWithMixedContent, Appearance.fullWidth, width);
        await scrollToTop(page);
        await snapshot(page, {}, 'body');
      });
    });
  });
});
