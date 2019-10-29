import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import {
  editable,
  expectMatchDocument,
  fullpage,
  doubleClickResizeHandle,
} from '../_helpers';
import {
  clickFirstCell,
  selectTable,
} from '../../__helpers/page-objects/_table';
import {
  tableWithUnevenColumns,
  tableWithUnevenColumnsInOverflow,
} from './__fixtures__/even-columns';

import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

// There is no positionDoubleClick on firefox
BrowserTestCase(
  'Should even columns on double click on resize handle when table is selected',
  { skip: ['ie', 'safari', 'firefox'] },
  async (client: any, testName: string) => {
    const page = await goToEditorTestingExample(client);

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(tableWithUnevenColumns),
      allowTables: {
        advanced: true,
      },
    });
    await clickFirstCell(page);
    await selectTable(page);
    await doubleClickResizeHandle(page, 2, 2);

    await expectMatchDocument(page, testName);
  },
);

// There is no positionDoubleClick on firefox
BrowserTestCase(
  'Should even columns and remain overflown on double click on resize handle when table is selected',
  { skip: ['ie', 'safari', 'firefox'] },
  async (client: any, testName: string) => {
    const page = await goToEditorTestingExample(client);

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(tableWithUnevenColumnsInOverflow),
      allowTables: {
        advanced: true,
      },
    });
    await clickFirstCell(page);
    await selectTable(page);
    await doubleClickResizeHandle(page, 2, 2);

    await expectMatchDocument(page, testName);
  },
);
