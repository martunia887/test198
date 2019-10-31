import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import {
  editable,
  expectMatchDocument,
  fullpage,
  insertEmoji,
  emojiItem,
  insertMention,
  lozenge,
} from '../_helpers';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

// https://product-fabric.atlassian.net/browse/ED-6802
// TODO: unskip firefox and safari
BrowserTestCase(
  'emoji.ts: Insert an emoji, then a mention, move to right before the emoji and try to add text between both',
  { skip: ['ie', 'safari', 'firefox'] },
  async (client: any, testName: string) => {
    const browser = await goToEditorTestingExample(client);
    await mountEditor(browser, {
      appearance: fullpage.appearance,
    });

    await insertEmoji(browser, 'grinning');
    await browser.waitForSelector(emojiItem('grinning'));
    await insertEmoji(browser, 'grinning');
    await browser.waitForSelector(emojiItem('grinning'));
    await insertMention(browser, 'Carolyn');
    await browser.waitForSelector(lozenge);
    await browser.keys([
      'ArrowLeft',
      'ArrowLeft',
      'ArrowLeft',
      'ArrowLeft',
      'ArrowLeft',
      'ArrowRight',
    ]);
    await browser.type(editable, 'Some text');
    await browser.keys(['ArrowRight', 'ArrowRight']);
    await browser.type(editable, 'Some text');
    await browser.keys(['ArrowRight', 'ArrowRight']);
    await browser.type(editable, 'Some text');
    await browser.click(editable);
    await expectMatchDocument(browser, testName);
  },
);
