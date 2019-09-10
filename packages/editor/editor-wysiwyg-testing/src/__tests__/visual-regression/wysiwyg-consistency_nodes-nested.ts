import { traverse } from '@atlaskit/adf-utils/traverse';
import { createDocumentADF } from './utils/_adf-utils';
import { loadKitchenSinkWithAdf } from './utils/_example-utils';
import { snapshotAndCompare } from './utils/_comparison-utils';
import { FragmentNodeLookup, contentNodes, containerNodes } from './_data';

describe('WYSIWYG Snapshot Test: Nested nodes look consistent in editor & renderer', () => {
  let page: any;

  beforeAll(async () => {
    // @ts-ignore
    page = global.page;
    await page.setViewport({ width: 2000, height: 1000 });
  });

  describe.each(containerNodes)(
    '%p',
    ({ node: containerNode }: FragmentNodeLookup) => {
      const containerAdf = createDocumentADF(containerNode, true);
      // Nested nodes
      it.each(contentNodes)(
        `%p inside ${containerNode}`,
        async ({ node: contentNode, waitFor }: FragmentNodeLookup) => {
          const contentAdf = createDocumentADF(contentNode).content;
          const adf = traverse(containerAdf, {
            any: (node: any) => {
              if (node.content && node.content.length === 0) {
                // Insert nested content into container
                node.content = contentAdf;
              }
              return node;
            },
          });
          await loadKitchenSinkWithAdf(page, adf);
          await snapshotAndCompare(
            page,
            `${contentNode} inside ${containerNode}`,
            waitFor,
          );
        },
      );
    },
  );
});
