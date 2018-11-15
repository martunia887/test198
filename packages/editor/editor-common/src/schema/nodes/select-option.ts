import { NodeSpec, Node } from 'prosemirror-model';

export const selectOption: NodeSpec = {
  group: 'inline',
  inline: true,
  content: 'text*',
  attrs: {
    color: {
      default: null,
    },
  },
  parseDOM: [
    {
      tag: 'option[data-node-type="select-option"]',
      getAttrs: (dom: HTMLElement) => {
        return {
          color: dom.getAttribute('data-color'),
        };
      },
    },
  ],
  toDOM(node: Node) {
    const attrs = {
      'data-node-type': 'select-option',
      'data-color': node.attrs.color,
    };
    return ['option', attrs, 0];
  },
};
