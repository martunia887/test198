import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import {
  editable,
  getDocFromElement,
  fullpage,
  copyToClipboard,
} from '../_helpers';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';
import { sleep } from '@atlaskit/media-test-helpers';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

const baseADF = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'mediaSingle',
      attrs: {
        layout: 'center',
      },
      content: [
        {
          type: 'media',
          attrs: {
            type: 'external',
            url:
              'https://images2.minutemediacdn.com/image/upload/c_crop,h_1193,w_2121,x_0,y_175/f_auto,q_auto,w_1100/v1554921998/shape/mentalfloss/549585-istock-909106260.jpg',
          },
        },
      ],
    },
    {
      type: 'paragraph',
      content: [],
    },
  ],
};

BrowserTestCase(
  'upload-external-media.ts: Keeps existing external as is',
  { skip: ['edge', 'ie', 'safari'] },
  async (client: any, testCase: string) => {
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: JSON.stringify(baseADF),
      media: {
        allowMediaSingle: true,
      },
    });

    await page.waitForSelector('.ProseMirror .wrapper');
    await page.click('.ProseMirror .wrapper');
    await page.copy(editable);

    await page.paste(editable);

    await sleep(2000);
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchCustomDocSnapshot(testCase);
  },
);

BrowserTestCase(
  'upload-external-media.ts: Uplaods external media when pasted',
  { skip: ['edge', 'ie', 'safari'] },
  async (client: any, testCase: string) => {
    const sample = new Page(client);
    await copyToClipboard(
      sample,
      `<meta charset='utf-8'><img src="https://images2.minutemediacdn.com/image/upload/c_crop,h_1193,w_2121,x_0,y_64/f_auto,q_auto,w_1100/v1565279671/shape/mentalfloss/578211-gettyimages-542930526.jpg" alt="Image result for cats"/>`,
      'html',
    );
    const page = await goToEditorTestingExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
      media: {
        allowMediaSingle: true,
      },
    });
    await page.click(editable);
    await page.paste(editable);
    await page.waitForSelector('.ProseMirror .wrapper');
    await sleep(0);
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchCustomDocSnapshot(testCase);
  },
);
