import { waitForLoadedBackgroundImages } from '@atlaskit/visual-regression/helper';

export type AsyncAwaitFunction = (page: any) => Promise<void>;

export type FragmentNodeLookup = {
  node: string;
  waitFor?: AsyncAwaitFunction[];
};

/**
 * ADF Node Fragments for WYSIWYG consistency testing.
 *
 * Note: these node names should match the de-hyphenated name of the adf fragment json
 * files contained within `__fixtures__/adf-node-fragments`.
 *
 * We declare this explicit list instead of reading the directory's files via the file system,
 * as this gives us greater control to skip specific nodes, should the need ever arise.
 *
 * Because these tests need to be deterministic, if a node requires additional time to load
 * a resource you can add a `waitForSelector` value to defer the screenshot until it's available.
 */
export const contentNodes: FragmentNodeLookup[] = [
  { node: 'actions' },
  { node: 'blockquote' },
  { node: 'bullet list' },
  { node: 'codeblock' },
  { node: 'date' },
  { node: 'decisions' },
  { node: 'divider' },
  {
    node: 'emoji',
    waitFor: [
      async (page: any): Promise<void> => {
        const emojiSelector = '.emoji-common-emoji-sprite';
        await page.waitForSelector(emojiSelector);
        await waitForLoadedBackgroundImages(page, emojiSelector);
      },
    ],
  },
  { node: 'heading' },
  { node: 'mention' },
  { node: 'ordered list' },
  { node: 'paragraph' },
  { node: 'status' },
];

export const containerNodes: FragmentNodeLookup[] = [
  { node: 'table' },
  { node: 'columns' },
  { node: 'panel' },
];

// Here we filter out nodes that don't render anything in their initial state
export const standaloneNodes = contentNodes.concat(
  containerNodes.filter((node: FragmentNodeLookup) => node.node !== 'columns'),
);
