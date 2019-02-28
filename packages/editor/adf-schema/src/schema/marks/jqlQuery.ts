import { MarkSpec } from 'prosemirror-model';

export const jqlQuery: MarkSpec = {
  parseDOM: [
    {
      tag: 'span.fabric-editor-jql-query-mark',
    },
  ],

  toDOM(mark) {
    return ['span', { class: 'fabric-editor-jql-query-mark' }, 0];
  },
};
