import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import { cardProviderStaging } from '@atlaskit/editor-test-helpers';
import {
  expectMatchDocument,
  fullpage,
  editable,
  copyToClipboard,
} from '../_helpers';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

BrowserTestCase(
  `inline-1.ts: pasting an link converts to inline card`,
  {
    skip: ['ie', 'safari'],
  },
  async (client: any, testName: string) => {
    let browser = new Page(client);

    // copy stuff to clipboard
    await copyToClipboard(browser, 'https://www.atlassian.com');

    // open up editor
    await goToEditorTestingExample(client, browser);
    await mountEditor(browser, {
      appearance: fullpage.appearance,
      UNSAFE_cards: {
        provider: Promise.resolve(cardProviderStaging),
      },
    });

    // type some text into the paragraph first
    await browser.type(editable, 'hello have a link ');

    // paste the link
    await browser.paste(editable);

    await expectMatchDocument(browser, testName);
  },
);
