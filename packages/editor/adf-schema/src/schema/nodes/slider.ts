import { NodeSpec, Node } from 'prosemirror-model';

export const slider: NodeSpec = {
  group: 'inline',
  inline: true,
  attrs: {
    value: { default: 0 },
  },
  parseDOM: [
    {
      tag: 'input[type="range"]',
      getAttrs(dom) {
        return {
          value: parseInt(
            (dom as HTMLElement).getAttribute('data-value') || '0',
            10,
          ),
        };
      },
    },
  ],
  toDOM(node: Node) {
    const attrs = {
      'data-value': node.attrs.value,
      type: 'range',
    };
    return ['input', attrs];
  },
};
