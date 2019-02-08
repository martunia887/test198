import { initFullPageEditorWithAdf, snapshot, deviceViewPorts } from './_utils';
import * as adf from './adf-data/codeblock-breakout.json';

describe('Snapshot Test: Breakout', () => {
  it('looks correct', async () => {
    // @ts-ignore
    const page = global.page;
    await page.setViewport(deviceViewPorts.MDPI);
    await initFullPageEditorWithAdf(page, adf);
    await snapshot(page, undefined);
  });
});
