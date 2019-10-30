import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import {
  expectMatchDocument,
  fullpage,
  insertBlockMenuItem,
  insertMedia,
} from '../_helpers';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

BrowserTestCase(
  `bodied-insert-media.ts: Bodied Extension: Insert Media`,
  { skip: ['edge', 'ie', 'safari'] },
  async (client: any, testName: string) => {
    const page = await goToEditorTestingExample(client);

    await mountEditor(page, {
      appearance: 'full-page',
      media: {
        allowMediaSingle: true,
        allowMediaGroup: true,
      },
      allowExtension: {
        allowBreakout: true,
      },
    });

    await page.waitForSelector(fullpage.placeholder);
    await page.click(fullpage.placeholder);

    await insertBlockMenuItem(page, 'Bodied macro (EH)');
    await insertMedia(page);

    await expectMatchDocument(page, testName);
  },
);
