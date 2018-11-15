import { NodeSpec, Node } from 'prosemirror-model';

export const singleSelect: NodeSpec = {
  inline: false,
  group: 'block',
  content: 'selectOption+',
  attrs: {
    value: {
      default: null,
    },
    color: {
      default: null,
    },
    allowCreateOptions: {
      default: false,
    },
  },
  parseDOM: [
    {
      tag: 'select[data-node-type="single-select"]',
      getAttrs: (dom: HTMLElement) => {
        return {
          value: dom.getAttribute('data-value'),
          color: dom.getAttribute('data-color'),
          allowCreateOptions:
            dom.getAttribute('data-allow-create-options') === 'true'
              ? true
              : false,
        };
      },
    },
  ],
  toDOM(node: Node) {
    const attrs = {
      'data-node-type': 'single-select',
      'data-value': node.attrs.value,
      'data-color': node.attrs.color,
      'data-allow-create-options': node.attrs.allowCreateOptions,
    };
    return ['select', attrs, 0];
  },
};
