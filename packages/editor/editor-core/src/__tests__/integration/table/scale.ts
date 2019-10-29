import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { editable, expectMatchDocument, fullpage } from '../_helpers';
import {
  insertColumn,
  deleteColumn,
} from '../../__helpers/page-objects/_table';
import {
  tableWithManyMinWidthCols,
  tableInOverflow,
} from './__fixtures__/scale';

import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

BrowserTestCase(
  'Should scale remaining columns when adding a new column preventing from going to overflow',
  { skip: ['ie', 'safari'] },
  async (client: any, testName: string) => {
    const page = await goToEditorTestingExample(client);

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(tableWithManyMinWidthCols),
      allowTables: {
        advanced: true,
      },
    });

    await insertColumn(page, 5, 'left');

    await expectMatchDocument(page, testName);
  },
);

BrowserTestCase(
  'Should scale remaining columns when deleting a column recovering table from overflow',
  { skip: ['ie', 'safari'] },
  async (client: any, testName: string) => {
    const page = await goToEditorTestingExample(client);

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(tableInOverflow),
      allowTables: {
        advanced: true,
      },
    });

    await deleteColumn(page, 1);

    await expectMatchDocument(page, testName);
  },
);
