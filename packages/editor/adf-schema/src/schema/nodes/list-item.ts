import { NodeSpec } from 'prosemirror-model';

import { BulletListDefinition as BulletList } from './bullet-list';
import { CodeBlockDefinition as CodeBlock } from './code-block';
import { MediaSingleDefinition as MediaSingle } from './media-single';
import { OrderedListDefinition as OrderedList } from './ordered-list';
import { ParagraphDefinition as Paragraph } from './paragraph';

export interface ListItemArray
  extends Array<
    Paragraph | OrderedList | BulletList | MediaSingle | CodeBlock
  > {
  0: Paragraph | MediaSingle | CodeBlock;
}

/**
 * @name listItem_node
 */
export interface ListItemDefinition {
  type: 'listItem';
  /**
   * @minItems 1
   */
  content: ListItemArray;
}

export const listItem: NodeSpec = {
  content:
    '(paragraph | mediaSingle | codeBlock) (paragraph | bulletList | orderedList | mediaSingle | codeBlock)*',
  defining: true,
  parseDOM: [{ tag: 'li' }],
  toDOM() {
    return ['li', 0];
  },
};
