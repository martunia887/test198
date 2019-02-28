import { NodeSpec, Node as PMNode } from 'prosemirror-model';

export const jiraIssue: NodeSpec = {
  inline: true,
  group: 'inline',
  selectable: true,
  attrs: {
    data: { default: null },
  },
  parseDOM: [
    {
      tag: 'span[data-jira-issue-data]',
      getAttrs: dom => {
        const data = (dom as HTMLElement).getAttribute('data-jira-issue-data');

        return {
          data: data ? JSON.parse(data) : null,
        };
      },
    },
  ],
  toDOM(node: PMNode) {
    const attrs = {
      'data-jira-issue-data': node.attrs.data
        ? JSON.stringify(node.attrs.data)
        : '',
    };
    return ['span', attrs];
  },
};
