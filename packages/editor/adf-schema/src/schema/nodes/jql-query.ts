import { NodeSpec } from 'prosemirror-model';

export const jqlQuery: NodeSpec = {
  group: 'inline',
  inline: true,
  selectable: true,
  toDOM: () => ['span', { 'data-jql-query': 'true' }],
  parseDOM: [{ tag: 'span[data-jql-query]' }],
};
