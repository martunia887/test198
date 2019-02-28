import { NodeSpec } from 'prosemirror-model';

export const jqlQuery: NodeSpec = {
  group: 'block',
  inline: false,
  selectable: true,
  toDOM: () => ['div', { 'data-jql-query': 'true' }],
  parseDOM: [{ tag: 'div[data-jql-query]' }],
};
