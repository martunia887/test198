import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import {
  expectMatchDocument,
  fullpage,
  insertBlockMenuItem,
  forEach,
} from '../_helpers';

import { messages } from '../../../plugins/insert-block/ui/ToolbarInsertBlock';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

BrowserTestCase(
  `insert-extension.ts: Extension: Insert Inline/Block extension`,
  { skip: ['ie', 'safari'] },
  async (client: any, testName: string) => {
    const page = await goToEditorTestingExample(client);

    await mountEditor(page, {
      appearance: 'full-page',
      allowTables: {
        advanced: true,
      },
      allowExtension: {
        allowBreakout: true,
      },
    });

    await page.waitForSelector(fullpage.placeholder);
    await page.click(fullpage.placeholder);

    await page.click(`[aria-label="${messages.table.defaultMessage}"]`);
    await page.waitForSelector('table td p');

    await forEach(['Inline', 'Block'], async extensionType => {
      await insertBlockMenuItem(page, `${extensionType} macro (EH)`);
    });

    await expectMatchDocument(page, testName);
  },
);
