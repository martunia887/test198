import { snapshot, initRendererWithADF } from './_utils';
import headings from '../__fixtures__/headings-adf.json';
import { waitForTooltip } from '@atlaskit/visual-regression/helper';
import { Page } from 'puppeteer';

describe('Headings:', () => {
  let page: Page;

  beforeEach(async () => {
    // @ts-ignore
    page = global.page;
    await initRendererWithADF(page, {
      adf: headings,
      rendererProps: {
        allowHeadingAnchorLinks: true,
        disableHeadingIDs: false,
      },
      appearance: 'full-page',
    });
  });

  afterEach(async () => {
    await snapshot(page);
  });

  test.each([1, 2, 3, 4, 5, 6])(
    'should render anchor link tooltip for h%s correctly',
    async headingLevel => {
      await page.waitForSelector(`h${headingLevel}:first-of-type`);
      await page.hover(`h${headingLevel}:first-of-type`);
      await page.waitForSelector(`h${headingLevel}:first-of-type button`);
      await page.hover(`h${headingLevel}:first-of-type button`);
      await waitForTooltip(page);
    },
  );
});
