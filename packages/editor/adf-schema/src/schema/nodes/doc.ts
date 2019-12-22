import { NodeSpec } from 'prosemirror-model';

import { AnnotationMarkDefinition as Annotation } from '../marks/annotation';
import { CodeDefinition as Code } from '../marks/code';
import { EmDefinition as Em } from '../marks/em';
import { LinkDefinition as Link } from '../marks/link';
import { StrikeDefinition as Strike } from '../marks/strike';
import { StrongDefinition as Strong } from '../marks/strong';
import { SubSupDefinition as SubSup } from '../marks/subsup';
import { TextColorDefinition as TextColor } from '../marks/text-color';
import { UnderlineDefinition as Underline } from '../marks/underline';

import { BlockCardDefinition as BlockCard } from './block-card';
import { BlockQuoteDefinition as Blockquote } from './blockquote';
import { BodiedExtensionDefinition as BodiedExtension } from './bodied-extension';
import { BulletListDefinition as BulletList } from './bullet-list';
import {
  CodeBlockDefinition as CodeBlock,
  CodeBlockWithMarksDefinition as CodeBlockWithMarks,
} from './code-block';
import { DateDefinition as Date } from './date';
import { DecisionListDefinition as DecisionList } from './decision-list';
import { EmojiDefinition as Emoji } from './emoji';
import { ExpandDefinition as Expand } from './expand';
import { ExtensionDefinition as Extension } from './extension';
import { HardBreakDefinition as HardBreak } from './hard-break';
import {
  HeadingDefinition as Heading,
  HeadingWithMarksDefinition as HeadingWithMarks,
} from './heading';
import { InlineCardDefinition as InlineCard } from './inline-card';
import { InlineExtensionDefinition as InlineExtension } from './inline-extension';
import { LayoutSectionDefinition as LayoutSection } from './layout-section';
import { MediaGroupDefinition as MediaGroup } from './media-group';
import { MediaSingleDefinition as MediaSingle } from './media-single';
import { MentionDefinition as Mention } from './mention';
import { NestedExpandDefinition as NestedExpand } from './nested-expand';
import { OrderedListDefinition as OrderedList } from './ordered-list';
import { PanelDefinition as Panel } from './panel';
import {
  ParagraphDefinition as Paragraph,
  ParagraphWithMarksDefinition as ParagraphWithMarks,
} from './paragraph';
import { PlaceholderDefinition as Placeholder } from './placeholder';
import { RuleDefinition as Rule } from './rule';
import { StatusDefinition as Status } from './status';
import { TableDefinition as Table } from './tableNodes';
import {
  TaskListDefinition as TaskList,
  TaskListWithNestingDefinition as NestableTaskList,
} from './task-list';
import { TextDefinition as Text } from './text';

// NOTE: BlockContent is only being used by layoutColumn now.
/**
 * @name block_content
 */
export type BlockContent =
  | Panel
  | Paragraph
  | ParagraphWithMarks
  | Blockquote
  | OrderedList
  | BulletList
  | Rule
  | Heading
  | HeadingWithMarks
  | CodeBlock
  | MediaGroup
  | MediaSingle
  | DecisionList
  | TaskList
  | NestableTaskList
  | Table
  | Expand
  | Extension
  | BodiedExtension
  | BlockCard;

/**
 * @name table_cell_content
 * @minItems 1
 * @allowUnsupportedBlock true
 */
export type TableCellContent = Array<
  | Panel
  | Paragraph
  | ParagraphWithMarks
  | Blockquote
  | OrderedList
  | BulletList
  | Rule
  | Heading
  | HeadingWithMarks
  | CodeBlock
  | MediaGroup
  | MediaSingle
  | DecisionList
  | TaskList
  | NestableTaskList
  | Extension
  | BlockCard
  | NestedExpand
>;

// exclude BodiedExtension
/**
 * @name extension_content
 * @minItems 1
 * @allowUnsupportedBlock true
 */
export type ExtensionContent = Array<
  | Panel
  | Paragraph
  | Blockquote
  | OrderedList
  | BulletList
  | Rule
  | Heading
  | CodeBlock
  | MediaGroup
  | MediaSingle
  | DecisionList
  | TaskList
  | NestableTaskList
  | Table
  | Extension
  | BlockCard
>;

/**
 * @name nestedExpand_content
 * @minItems 1
 * @allowUnsupportedBlock true
 */
export type NestedExpandContent = Array<
  Paragraph | Heading | MediaSingle | MediaGroup
>;

/**
 * @additionalProperties true
 */
export interface MarksObject<T> {
  marks?: Array<T>;
}

/**
 * @additionalProperties true
 */
export interface NoMark {
  /**
   * @maxItems 0
   */
  marks?: Array<any>;
}

/**
 * @name formatted_text_inline_node
 */
export type InlineFormattedText = Text &
  MarksObject<
    Link | Em | Strong | Strike | SubSup | Underline | TextColor | Annotation
  >;

/**
 * @name link_text_inline_node
 */
export type InlineLinkText = Text & MarksObject<Link>;

/**
 * @name code_inline_node
 */
export type InlineCode = Text & MarksObject<Code | Link | Annotation>;

/**
 * @name atomic_inline_node
 */
export type InlineAtomic =
  | HardBreak
  | Mention
  | Emoji
  | InlineExtension
  | Date
  | Placeholder
  | InlineCard
  | Status;

/**
 * @name inline_node
 */
export type Inline = InlineFormattedText | InlineCode | InlineAtomic;

/**
 * @name doc_node
 */
export interface DocNode {
  version: 1;
  type: 'doc';
  /**
   * @allowUnsupportedBlock true
   */
  content: Array<BlockContent | LayoutSection | CodeBlockWithMarks>;
}

export const doc: NodeSpec = {
  content: '(block|layoutSection)+',
  marks: 'alignment breakout indentation link',
};
