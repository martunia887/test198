import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  expectMatchDocument,
  comment,
  fullpage,
  editable,
  copyToClipboard,
} from '../_helpers';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';

[comment, fullpage].forEach(editor => {
  BrowserTestCase(
    `hyperlink-markdown-paste-text.ts: Link - link markdown with pasting link text ${
      editor.name
    } editor`,
    {
      skip: ['ie', 'edge', 'safari'],
    },
    async (client: any, testName: string) => {
      const sample = new Page(client);
      await copyToClipboard(sample, 'https://hello.com');

      await goToEditorTestingExample(client, sample);
      await mountEditor(sample, { appearance: 'full-page' });

      await sample.type(editable, ['[link1](']);
      await sample.paste();
      await sample.type(editable, [')']);

      await expectMatchDocument(sample, testName);
    },
  );
});
