import { NodeSpec, DOMOutputSpec } from 'prosemirror-model';
import { Inline, MarksObject } from './doc';
import { AlignmentMarkDefinition } from '..';

/**
 * @name paragraph_node
 */
export type ParagraphDefinition = {
  type: 'paragraph';
  /**
   * @allowUnsupportedInline true
   */
  content?: Array<Inline>;
};

/**
 * @name paragraph_with_alignment_node
 * @stage 0
 */
export type ParagraphWithAlignment = ParagraphDefinition &
  MarksObject<AlignmentMarkDefinition>;

const pDOM: DOMOutputSpec = ['p', 0];
export const paragraph: NodeSpec = {
  content: 'inline*',
  group: 'block',
  marks:
    'strong code em link strike subsup textColor typeAheadQuery underline mentionQuery emojiQuery confluenceInlineComment action',
  parseDOM: [{ tag: 'p' }],
  toDOM() {
    return pDOM;
  },
};
