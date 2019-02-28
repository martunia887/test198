import { NodeSpec, Node as PMNode } from 'prosemirror-model';

export const jiraIssueSelect: NodeSpec = {
  inline: false,
  group: 'block',
  selectable: false,
  attrs: {
    data: { default: null },
  },
  parseDOM: [
    {
      tag: 'div[data-issue-select-data]',
      getAttrs: dom => {
        const data = (dom as HTMLElement).getAttribute(
          'data-issue-select-data',
        );

        return {
          data: data ? JSON.parse(data) : null,
        };
      },
    },
  ],
  toDOM(node: PMNode) {
    const attrs = {
      'data-issue-select-data': node.attrs.data
        ? JSON.stringify(node.attrs.data)
        : '',
    };
    return ['div', attrs];
  },
};
