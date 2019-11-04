import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { sleep } from '@atlaskit/editor-test-helpers';

import { expectMatchDocument, fullpage } from '../_helpers';

import {
  autoSizeToDefaultLayout,
  autoSizeToWideLayout,
  autoSizeToFullWidthLayout,
} from './__fixtures__/auto-size-documents';

import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

async function loadAndRetrieveDocument(
  page: any,
  document: object,
  expectedLayout = 'default',
  testName: string,
) {
  await page.browser.maximizeWindow();

  await mountEditor(page, {
    appearance: fullpage.appearance,
    defaultValue: JSON.stringify(document),
    allowPanel: true,
    allowTables: {
      advanced: true,
    },
  });

  await page.waitForSelector(`table[data-layout="${expectedLayout}"]`);
  await sleep(500);

  await expectMatchDocument(page, testName);
}

BrowserTestCase(
  'Doesnt scale past default',
  { skip: ['ie', 'edge', 'safari', 'firefox'] },
  async (client: any, testName: string) => {
    const page = await goToEditorTestingExample(client);
    await loadAndRetrieveDocument(
      page,
      autoSizeToDefaultLayout,
      'default',
      testName,
    );
  },
);

BrowserTestCase(
  'Scales to wide',
  { skip: ['ie', 'edge', 'safari', 'firefox'] },
  async (client: any, testName: string) => {
    const page = await goToEditorTestingExample(client);
    await loadAndRetrieveDocument(page, autoSizeToWideLayout, 'wide', testName);
  },
);

BrowserTestCase(
  'Scales to full-width',
  { skip: ['ie', 'edge', 'safari', 'firefox'] },
  async (client: any, testName: string) => {
    const page = await goToEditorTestingExample(client);
    await loadAndRetrieveDocument(
      page,
      autoSizeToFullWidthLayout,
      'full-width',
      testName,
    );
  },
);
