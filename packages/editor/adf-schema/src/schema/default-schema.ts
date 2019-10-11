import { createSchema } from './create-schema';
import { Schema } from 'prosemirror-model';

export const defaultSchema: Schema = createSchema({
  nodes: [
    'doc',
    'paragraph',
    'text',
    'bulletList',
    'orderedList',
    'listItem',
    'heading',
    'blockquote',
    'codeBlock',
    'panel',
    'rule',
    'image',
    'mention',
    'media',
    'mediaGroup',
    'mediaSingle',
    'confluenceUnsupportedBlock',
    'confluenceUnsupportedInline',
    'confluenceJiraIssue',
    'expand',
    'extension',
    'inlineExtension',
    'bodiedExtension',
    'hardBreak',
    'emoji',
    'table',
    'tableCell',
    'tableHeader',
    'tableRow',
    'decisionList',
    'decisionItem',
    'taskList',
    'taskItem',
    'unknownBlock',
    'date',
    'status',
    'placeholder',
    'layoutSection',
    'layoutColumn',
    'inlineCard',
    'blockCard',
    'unsupportedBlock',
    'unsupportedInline',
  ],
  marks: [
    'link',
    'em',
    'strong',
    'strike',
    'subsup',
    'underline',
    'code',
    'textColor',
    'confluenceInlineComment',
    'breakout',
    'alignment',
    'indentation',
    'annotation',
  ],
});
