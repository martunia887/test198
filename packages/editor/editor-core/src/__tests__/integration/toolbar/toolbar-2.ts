import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

import { messages } from '../../../plugins/block-type/types';
import { messages as blockTypeMessages } from '../../../plugins/block-type/ui/ToolbarBlockType';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';
import { comment, fullpage, editable } from '../_helpers';

const changeFormatting = `[aria-label="${blockTypeMessages.textStyles.defaultMessage}"]`;
const input = 'helloworld';

// https://product-fabric.atlassian.net/browse/ED-4531
[comment, fullpage].forEach(editor => {
  BrowserTestCase(
    `toolbar-2.ts: should be able to select heading1 for ${editor.name} editor`,
    { skip: ['ie', 'safari'] },
    async (client: any) => {
      const page = await goToEditorTestingExample(client);
      await mountEditor(page, { appearance: editor.appearance });

      await page.click(editable);
      await page.waitForSelector(changeFormatting);
      await page.type(editable, input);
      for (let i = 1; i <= 6; i++) {
        await validateFormat(page, i);
      }
    },
  );
});

const validateFormat = async (browser: any, heading: number) => {
  const selector =
    'span=' +
    messages[('heading' + heading) as keyof typeof messages].defaultMessage;
  await browser.click(changeFormatting);
  await browser.waitForSelector(selector);
  await browser.click(selector);
  await browser.waitForSelector(`h${heading}`);
};
