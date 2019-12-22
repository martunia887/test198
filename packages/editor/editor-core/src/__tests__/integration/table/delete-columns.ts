import { IntlProvider } from 'react-intl';
import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

import { TableCssClassName as ClassName } from '../../../plugins/table/types';
import messages from '../../../plugins/table/ui/messages';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';
import { editable, getDocFromElement, fullpage } from '../_helpers';

import { documentWithMergedCells } from './__fixtures__/merged-rows-and-cols-document';

BrowserTestCase(
  'Should delete merged columns from contextual menu and append missing cells to the table',
  { skip: ['ie', 'edge', 'firefox', 'safari'] },
  async (client: any, testName: string) => {
    const page = await goToEditorTestingExample(client);
    const intlProvider = new IntlProvider({ locale: 'en' });
    const { intl } = intlProvider.getChildContext();

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(documentWithMergedCells),
      allowTables: {
        advanced: true,
      },
    });

    const controlSelector = `tbody tr:first-child th:nth-child(2)`;
    await page.waitForSelector(controlSelector);
    await page.click(controlSelector);

    const contextMenuTriggerSelector = `.${ClassName.CONTEXTUAL_MENU_BUTTON}`;
    await page.waitForSelector(contextMenuTriggerSelector);
    await page.click(contextMenuTriggerSelector);

    const message = await intl.formatMessage(messages.removeColumns, {
      0: 1,
    });
    const contextMenuItemSelector = `span=${message}`;
    await page.waitForSelector(contextMenuItemSelector);
    await page.click(contextMenuItemSelector);

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchCustomDocSnapshot(testName);
  },
);

BrowserTestCase(
  'Should delete merged columns from contextual menu and decrement colspan of the spanning cell',
  { skip: ['ie', 'edge', 'firefox', 'safari'] },
  async (client: any, testName: string) => {
    const page = await goToEditorTestingExample(client);
    const intlProvider = new IntlProvider({ locale: 'en' });
    const { intl } = intlProvider.getChildContext();

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(documentWithMergedCells),
      allowTables: {
        advanced: true,
      },
    });

    const controlSelector = `tbody tr:first-child th:nth-child(3)`;
    await page.waitForSelector(controlSelector);
    await page.click(controlSelector);

    const contextMenuTriggerSelector = `.${ClassName.CONTEXTUAL_MENU_BUTTON}`;
    await page.waitForSelector(contextMenuTriggerSelector);
    await page.click(contextMenuTriggerSelector);

    const message = await intl.formatMessage(messages.removeColumns, {
      0: 1,
    });
    const contextMenuItemSelector = `span=${message}`;
    await page.waitForSelector(contextMenuItemSelector);
    await page.click(contextMenuItemSelector);

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchCustomDocSnapshot(testName);
  },
);
