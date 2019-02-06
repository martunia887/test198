import { initFullPageEditorWithAdf, snapshot } from './_utils';
import * as adf from './adf-data/codeblock-breakout.json';

describe('Snapshot Test: Breakout', () => {
  it('looks correct', async () => {
    // @ts-ignore
    const page = global.page;
    await page.setViewport({ width: 1280, height: 1024, deviceScaleFactor: 0 });
    let viewport = page.viewport();
    expect(viewport.width).toBe(1280);
    expect(viewport.height).toBe(1024);
    await initFullPageEditorWithAdf(page, adf);
    await snapshot(page);
  });
});
