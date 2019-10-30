import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { expectMatchDocument, editable, insertMenuItem } from '../_helpers';
import { messages as insertBlockMessages } from '../../../plugins/insert-block/ui/ToolbarInsertBlock';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

BrowserTestCase(
  `layouts: Backspacing within a layout shouldnt remove all contents`,
  { skip: ['ie', 'firefox'] },
  async (client: any, testName: string) => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, {
      appearance: 'full-page',
      allowLayouts: true,
      allowLists: true,
    });

    await insertMenuItem(page, insertBlockMessages.columns.defaultMessage);
    await page.type(editable, '* abc');
    await page.keys('Return');
    await page.type(editable, '123');
    await page.keys(Array.from({ length: 3 }, _ => 'Backspace'));

    await expectMatchDocument(page, testName);
  },
);
