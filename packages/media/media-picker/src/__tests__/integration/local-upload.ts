import * as path from 'path';
import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

import { gotoPopupSimplePage } from '../../../pages/popup-simple-page';

BrowserTestCase(
  'local-upload.ts: MediaPicker - local upload',
  { skip: ['edge', 'ie', 'safari'] },
  async (client: Parameters<typeof gotoPopupSimplePage>[0]) => {
    const page = await gotoPopupSimplePage(client);
    const filename = 'popup.png';
    const localPath = path.join(__dirname, '..', '..', '..', 'docs', filename);

    expect(await page.getRecentUploadCards()).toHaveLength(0);

    await page.uploadFile(localPath);
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
