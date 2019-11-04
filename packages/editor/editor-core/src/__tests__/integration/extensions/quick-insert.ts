import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { messages } from '../../../plugins/insert-block/ui/ToolbarInsertBlock';

import { expectMatchDocument, fullpage, quickInsert } from '../_helpers';
import {
  mountEditor,
  goToEditorTestingExample,
} from '../../__helpers/testing-example-helpers';

BrowserTestCase(
  `quick-insert.ts: Extension: Quick Insert`,
  { skip: ['edge', 'ie', 'safari'] },
  async (client: any, testName: string) => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, {
      appearance: 'full-page',
      allowExtension: {
        allowBreakout: true,
      },
      quickInsert: true,
    });
    await page.click(fullpage.placeholder);

    await quickInsert(page, 'Bodied extension');
    await page.click('.extension-content p');
    await quickInsert(page, messages.action.defaultMessage);

    await expectMatchDocument(page, testName);
  },
);
