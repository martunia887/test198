import * as path from 'path';
import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

import { gotoPopupSimplePage } from '../../../pages/popup-simple-page';
import { PopupSimpleBackdoor } from '../../../examples/6-popup-simple';
//
// BrowserTestCase(
//   'local-upload.ts: MediaPicker - insert newly fully uploaded file',
//   // Skipping safari because of ongoing issue (comms via email with support) with Browserstack atm
//   // Skipping IE because of different ongoing issue (comms via email with support) with Browserstack atm
//   { skip: ['ie', 'safari'] },
//   async (client: Parameters<typeof gotoPopupSimplePage>[0]) => {
//     const page = await gotoPopupSimplePage(client);
//     const filename = 'popup.png';
//     const localPath = path.join(__dirname, '..', '..', '..', 'docs', filename);
//
//     expect(await page.getRecentUploadCards()).toHaveLength(0);
//
//     await page.uploadFile(localPath);
//     const cardWithFilename = await page.getRecentUploadCard({filename, status: 'complete'});
//     expect(cardWithFilename).toBeDefined();
//     await page.clickInsertButton();
//
//     expect(await page.getEvent('uploads-start')).toMatchObject({
//       payload: { files: [{ name: filename }] },
//     });
//
//     expect(await page.getEvent('upload-processing')).toMatchObject({
//       payload: { file: { name: filename } },
//     });
//   },
// );

BrowserTestCase(
  'local-upload.ts: MediaPicker - insert a file before it finished uploading',
  // Skipping safari because of ongoing issue (comms via email with support) with Browserstack atm
  // Skipping IE because of different ongoing issue (comms via email with support) with Browserstack atm
  { skip: ['ie', 'safari'] },
  async (client: Parameters<typeof gotoPopupSimplePage>[0]) => {
    const page = await gotoPopupSimplePage(client);

    await page.waitUntil(
      async () => await page.execute(() => (window as any).backdoor),
    );

    await page.execute(() => {
      ((window as any).backdoor as PopupSimpleBackdoor).resetMediaMock({
        isSlowServer: true,
      });
    });

    const filename = 'popup.png';
    const localPath = path.join(__dirname, '..', '..', '..', 'docs', filename);

    expect(await page.getRecentUploadCards()).toHaveLength(0);

    await page.uploadFile(localPath);
    const cardWithFilename = await page.getRecentUploadCard({
      filename,
      status: 'uploading',
    });
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
