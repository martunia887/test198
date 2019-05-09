import {
  snapshot,
  deviceViewPorts,
  Device,
  goToRendererTestingExample,
  mountRenderer,
} from '../_utils';
import adf from './__fixtures__/renderer-media.adf.json';
// import { selectors as mediaSelectors } from '../../__helpers/page-objects/_media';
import { selectors as rendererSelectors } from '../../__helpers/page-objects/_renderer';
import { Page } from 'puppeteer';
import { cleanseAdfMedia } from '../../__helpers/page-objects/_media';
import { waitForLoadedImageElements } from '@atlaskit/visual-regression/helper';

const devices = [
  Device.LaptopHiDPI,
  Device.LaptopMDPI,
  Device.iPad,
  Device.iPadPro,
  Device.iPhonePlus,
];

describe('Snapshot Test: Media', () => {
  describe('renderer', () => {
    let page: Page;

    beforeAll(async () => {
      // @ts-ignore
      page = global.page;
      await goToRendererTestingExample(page);
    });

    describe('media layout', () => {
      devices.forEach(device => {
        it(`should correctly render ${device}`, async () => {
          await page.setViewport(deviceViewPorts[device]);
          const _adf = cleanseAdfMedia(adf);
          await mountRenderer(page, {
            appearance: 'full-page',
            allowDynamicTextSizing: true,
            // document: adf,
            document: _adf,
          });

          // await page.waitForSelector(mediaSelectors.errorLoading); // In test should show overlay error

          await page.waitForSelector(rendererSelectors.document);
          await waitForLoadedImageElements(page, 1000, 0); // 1 second timeout and no media API delay.
          await snapshot(page, 0.01, rendererSelectors.document);
        });
      });
    });
  });
});
