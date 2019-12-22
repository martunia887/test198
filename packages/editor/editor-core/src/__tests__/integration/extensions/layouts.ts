import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

import commonMessages from '../../../messages';
import {
  mountEditor,
  goToEditorTestingExample,
} from '../../__helpers/testing-example-helpers';
import {
  getDocFromElement,
  editable,
  insertBlockMenuItem,
  changeSelectedNodeLayout,
} from '../_helpers';

[
  commonMessages.layoutFixedWidth,
  commonMessages.layoutWide,
  commonMessages.layoutFullWidth,
].forEach(layoutMessages => {
  const layoutName = layoutMessages.id.split('.').pop();
  BrowserTestCase(
    `layouts.ts: Extension: ${layoutName} layout`,
    { skip: ['edge', 'ie'] },
    async (client: any, testName: string) => {
      const page = await goToEditorTestingExample(client);
      await mountEditor(page, {
        appearance: 'full-page',
        allowExtension: {
          allowBreakout: true,
        },
      });

      await insertBlockMenuItem(page, 'Block macro (EH)');
      await changeSelectedNodeLayout(page, layoutMessages.defaultMessage);

      const doc = await page.$eval(editable, getDocFromElement);
      expect(doc).toMatchCustomDocSnapshot(testName);
    },
  );
});
