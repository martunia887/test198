import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { editable, getDocFromElement, fullpage } from '../_helpers';
import {
  goToEditorTestingExample,
  mountEditor,
} from '../../__helpers/testing-example-helpers';
import { sleep } from '@atlaskit/media-test-helpers';

const baseADF = {
  "version": 1,
  "type": "doc",
  "content": [
    {
      "type": "mediaSingle",
      "attrs": {
        "layout": "center"
      },
      "content": [
        {
          "type": "media",
          "attrs": {
            "type": "external",
            "url": "https://images2.minutemediacdn.com/image/upload/c_crop,h_1193,w_2121,x_0,y_175/f_auto,q_auto,w_1100/v1554921998/shape/mentalfloss/549585-istock-909106260.jpg"
          }
        }
      ]
    },
    {
      "type": "paragraph",
      "content": []
    }
  ]
}

BrowserTestCase(
  'copy-mediaSingle-replacement.ts: Copies and pastes mediaSingle on fullpage',
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

    // select the middle one and copy it
    //
    // uses .overlay since these error without being signed into Media Services
    // use the .wrapper selector if we're able to resolve the image
    await page.waitForSelector('.ProseMirror .wrapper');
    await page.click('.ProseMirror .wrapper');
    await page.copy(editable);

    await page.paste(editable);
    await page.waitForSelector('.ProseMirror .wrapper');
    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchCustomDocSnapshot(testCase);
  },
);
