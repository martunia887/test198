import { createSchema } from '@atlaskit/adf-schema';
import { Schema } from 'prosemirror-model';
export const schema: Schema = createSchema({
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
    'rule',
  ],
  marks: ['em', 'strong', 'code', 'strike', 'underline', 'textColor'],
});
