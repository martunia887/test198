import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

import { gotoPopupSimplePage } from '../../../pages/popup-simple-page';
import {
  simpleBase64ZippedImageFile,
  simpleImageFilename,
} from '@atlaskit/media-test-helpers';

BrowserTestCase(
  'local-upload.ts: MediaPicker - local upload',
  { skip: ['edge', 'ie', 'safari', 'firefox'] },
  async (client: BrowserObject) => {
    const page = await gotoPopupSimplePage(client);
    const filename = simpleImageFilename;

    expect(await page.getRecentUploadCards()).toHaveLength(0);

    await page.uploadFile(simpleBase64ZippedImageFile);
    const cardWithFilename = await page.getRecentUploadCard(filename);
    expect(cardWithFilename).toBeDefined();
    await page.clickInsertButton();

    expect(await page.getEvent('uploads-start')).toMatchObject({
      payload: { files: [{ name: filename }] },
    });

    expect(await page.getEvent('upload-processing')).toMatchObject({
      payload: { file: { name: filename } },
    });
  },
);
