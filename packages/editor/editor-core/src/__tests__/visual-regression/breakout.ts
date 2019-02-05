import { initFullPageEditorWithAdf, snapshot } from './_utils';
import * as adf from './adf-data/codeblock-breakout.json';

describe('Snapshot Test: Breakout', () => {
  it('looks correct', async () => {
    // @ts-ignore
    const page = global.page;
    await initFullPageEditorWithAdf(page, adf);
    await page.setViewport({ width: 1000, height: 1000 });
    await snapshot(page);
  });
});
