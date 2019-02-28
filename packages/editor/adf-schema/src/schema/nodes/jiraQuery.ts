import { NodeSpec } from 'prosemirror-model';

export const jiraQuery: NodeSpec = {
  group: 'inline',
  content: 'inline*',
  inline: true,
  draggable: true,
  // This makes the view treat the node as a leaf, even though it
  // technically has content
  atom: true,
  toDOM: () => ['span', { 'data-jira-query': 'true' }],
  parseDOM: [{ tag: 'span[data-jira-query]' }],
};
