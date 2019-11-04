import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import {
  editable,
  expectMatchDocument,
  fullpage,
  quickInsert,
} from '../_helpers';
import {
  mountEditor,
  goToEditorTestingExample,
} from '../../__helpers/testing-example-helpers';

// TODO: safari keys do not work after upgrade
BrowserTestCase(
  'status.ts: Insert status into panel, move cursor to right before status, and add text',
  { skip: ['ie', 'safari'] },
  async (client: any, testName: string) => {
    const browser = await goToEditorTestingExample(client);
    await mountEditor(browser, {
      appearance: fullpage.appearance,
      allowStatus: true,
      allowPanel: true,
    });

    await quickInsert(browser, 'Info panel');

    await quickInsert(browser, 'Status');

    await browser.waitForSelector(`[aria-label="Popup"] input`);
    await browser.type(`[aria-label="Popup"] input`, 'DONE');
    await browser.click(editable);
    await browser.keys([
      'Backspace',
      'ArrowLeft',
      'ArrowLeft',
      'S',
      'o',
      'm',
      'e',
      ' ',
      't',
      'e',
      'x',
      't',
    ]);

    await expectMatchDocument(browser, testName);
  },
);

BrowserTestCase(
  'status.ts: Insert status into panel, move cursor to right before panel, move right, and add text',
  { skip: ['ie', 'safari'] },
  async (client: any, testName: string) => {
    const browser = await goToEditorTestingExample(client);
    await mountEditor(browser, {
      appearance: fullpage.appearance,
      allowStatus: true,
      allowPanel: true,
    });

    await quickInsert(browser, 'Info panel');

    await quickInsert(browser, 'Status');

    await browser.waitForSelector(`[aria-label="Popup"] input`);
    await browser.type(`[aria-label="Popup"] input`, 'DONE');
    await browser.click(editable);
    await browser.keys([
      'Backspace',
      'ArrowLeft',
      'ArrowLeft',
      'ArrowLeft',
      'ArrowRight',
      'S',
      'o',
      'm',
      'e',
      ' ',
      't',
      'e',
      'x',
      't',
    ]);

    await expectMatchDocument(browser, testName);
  },
);
