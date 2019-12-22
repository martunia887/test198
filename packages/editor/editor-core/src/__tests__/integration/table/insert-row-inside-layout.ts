import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

import { insertRow } from '../../__helpers/page-objects/_table';
import { clickFirstCell } from '../../__helpers/page-objects/_table';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';
import {
  editable,
  animationFrame,
  getDocFromElement,
  fullpage,
} from '../_helpers';

import { table as tableInsideLayout } from './__fixtures__/table-inside-layout';

BrowserTestCase(
  'Should scale remaining columns when adding a new column preventing from going to overflow',
  { skip: ['ie'] },
  async (client: any, testName: string) => {
    const page = await goToEditorTestingExample(client);

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(tableInsideLayout),
      allowTables: {
        advanced: true,
      },
      allowLayouts: {
        allowBreakout: true,
      },
      allowBreakout: true,
    });

    await clickFirstCell(page);
    await animationFrame(page);
    await animationFrame(page);
    await insertRow(page, 1);
    await page.type(editable, 'should be inside of the table');

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchCustomDocSnapshot(testName);
  },
);
