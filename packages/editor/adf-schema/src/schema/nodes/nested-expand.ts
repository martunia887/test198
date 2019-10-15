import { NodeSpec, Node as PMNode } from 'prosemirror-model';
import { NestedExpandContent } from './doc';

/**
 * @name nestedExpand_node
 * @stage 0
 */
export interface NestedExpandDefinition {
  type: 'nestedExpand';
  attrs: {
    title?: string;
    collapsed?: boolean;
  };
  content: NestedExpandContent;
}

export const nestedExpand: NodeSpec = {
  inline: false,
  group: 'block',
  content:
    '(paragraph | blockquote | orderedList | bulletList | rule | heading | codeBlock | mediaGroup | mediaSingle | decisionList | taskList | blockCard | extension | unsupportedBlock)+',
  defining: true,
  isolating: true,
  selectable: true,
  attrs: {
    title: { default: 'Click here to expand...' },
    collapsed: { default: false },
  },
  parseDOM: [
    {
      tag: '[data-node-type="nestedExpand"]',
      getAttrs: domNode => {
        const dom = domNode as HTMLElement;
        return {
          title: dom.getAttribute('data-title'),
          collapsed: Boolean(
            dom.getAttribute('data-collapsed') === 'true' ? true : false,
          ),
        };
      },
    },
  ],
  toDOM(node: PMNode) {
    const attrs = {
      'data-node-type': 'nestedExpand',
      'data-title': node.attrs.title,
      'data-collapsed': node.attrs.collapsed,
    };
    return ['div', attrs, 0];
  },
};
