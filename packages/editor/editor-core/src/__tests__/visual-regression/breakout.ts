import { initFullPageEditorWithAdf, snapshot } from './_utils';
import * as adf from './adf-data/codeblock-breakout.json';

describe('Snapshot Test: Breakout', () => {
  it('looks correct', async () => {
    // @ts-ignore
    const page = global.page;
    await page.setViewport({ width: 1100, height: 500 });
    await initFullPageEditorWithAdf(page, adf);
    await snapshot(page);
  });
});
