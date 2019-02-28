import { NodeSpec } from 'prosemirror-model';

export const jiraQuery: NodeSpec = {
  group: 'inline',
  inline: true,
  selectable: true,
  toDOM: () => ['span', { 'data-jira-query': 'true' }],
  parseDOM: [{ tag: 'span[data-jira-query]' }],
};
