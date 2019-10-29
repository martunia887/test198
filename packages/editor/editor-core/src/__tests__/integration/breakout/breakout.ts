import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';
import { expectMatchDocument, editable } from '../_helpers';

import { messages } from '../../../plugins/block-type/types';
import commonMessages from '../../../messages';

const wideBreakoutButtonQuery = `div[aria-label="${
  commonMessages.layoutWide.defaultMessage
}"]`;
const fullWidthBreakoutButtonQuery = `div[aria-label="${
  commonMessages.layoutFullWidth.defaultMessage
}"]`;
const centerBreakoutButtonQuery = `div[aria-label="${
  commonMessages.layoutFixedWidth.defaultMessage
}"]`;

BrowserTestCase(
  'breakout: should be able to switch to wide mode',
  {},
  async (client: any, testName: string) => {
    const page = await goToEditorTestingExample(client);

    await mountEditor(page, {
      appearance: 'full-page',
      allowCodeBlocks: true,
      allowBreakout: true,
    });

    await page.click(`[aria-label="${messages.codeblock.defaultMessage}"]`);

    // Switch to wide breakout mode
    await page.waitForSelector(wideBreakoutButtonQuery);
    await page.click(wideBreakoutButtonQuery);
    await expectMatchDocument(page, testName);
  },
);

BrowserTestCase(
  'breakout: should be able to switch to full-width mode',
  {},
  async (client: any, testName: string) => {
    const page = await goToEditorTestingExample(client);

    await mountEditor(page, {
      appearance: 'full-page',
      allowCodeBlocks: true,
      allowBreakout: true,
    });

    await page.click(`[aria-label="${messages.codeblock.defaultMessage}"]`);

    // Switch to full-width breakout mode
    await page.waitForSelector(wideBreakoutButtonQuery);
    await page.click(wideBreakoutButtonQuery);
    await page.waitForSelector(fullWidthBreakoutButtonQuery);
    await page.click(fullWidthBreakoutButtonQuery);
    await expectMatchDocument(page, testName);
  },
);

BrowserTestCase(
  'breakout: should be able to switch to center mode back',
  { skip: ['ie'] },
  async (client: any, testName: string) => {
    const page = await goToEditorTestingExample(client);

    await mountEditor(page, {
      appearance: 'full-page',
      allowCodeBlocks: true,
      allowBreakout: true,
    });

    await page.click(`[aria-label="${messages.codeblock.defaultMessage}"]`);

    // Switch to wide breakout mode
    await page.waitForSelector(wideBreakoutButtonQuery);
    await page.click(wideBreakoutButtonQuery);

    await page.waitForSelector(fullWidthBreakoutButtonQuery);
    await page.click(fullWidthBreakoutButtonQuery);

    await page.waitForSelector(centerBreakoutButtonQuery);
    await page.click(centerBreakoutButtonQuery);
    await expectMatchDocument(page, testName);
  },
);

// TODO: https://product-fabric.atlassian.net/browse/ED-6802
// skipped on ie
BrowserTestCase(
  'breakout: should be able to delete last character inside a "wide" codeBlock preserving the node',
  { skip: ['ie'] },
  async (client: any, testName: string) => {
    const page = await goToEditorTestingExample(client);

    await mountEditor(page, {
      appearance: 'full-page',
      allowCodeBlocks: true,
      allowBreakout: true,
    });

    await page.click(`[aria-label="${messages.codeblock.defaultMessage}"]`);

    // Switch to wide breakout mode
    await page.waitForSelector(wideBreakoutButtonQuery);
    await page.click(wideBreakoutButtonQuery);

    await page.type(editable, 'a');
    await page.keys('Backspace');
    await expectMatchDocument(page, testName);
  },
);
