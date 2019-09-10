import { createDocumentADF } from './utils/_adf-utils';
import { loadKitchenSinkWithAdf } from './utils/_example-utils';
import { snapshotAndCompare } from './utils/_comparison-utils';
import { standaloneNodes } from './_data';

describe('WYSIWYG Snapshot Test: Standalone nodes look consistent in editor & renderer', () => {
  let page: any;

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await page.setViewport({ width: 2000, height: 1000 });
  });

  it.each(standaloneNodes)('%p', async ({ node, waitFor }) => {
    const adf = createDocumentADF(node);
    await loadKitchenSinkWithAdf(page, adf);
    await snapshotAndCompare(page, node, waitFor);
  });
});
