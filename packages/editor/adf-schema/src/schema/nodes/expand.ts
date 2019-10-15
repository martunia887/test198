import { NodeSpec, Node as PMNode } from 'prosemirror-model';
import { ExtensionContent } from './doc';

/**
 * @name expand_node
 * @stage 0
 */
export interface ExpandDefinition {
  type: 'expand';
  attrs: {
    title?: string;
    collapsed?: boolean;
  };
  content: ExtensionContent;
}

export const expand: NodeSpec = {
  inline: false,
  group: 'block',
  content:
    '(paragraph | panel | blockquote | orderedList | bulletList | rule | heading | codeBlock | mediaGroup | mediaSingle | decisionList | taskList | table | blockCard | extension | unsupportedBlock)+',
  defining: true,
  isolating: true,
  selectable: true,
  attrs: {
    title: { default: 'Click here to expand...' },
    collapsed: { default: false },
  },
  parseDOM: [
    {
      tag: '[data-node-type="expand"]',
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
      'data-node-type': 'expand',
      'data-title': node.attrs.title,
      'data-collapsed': node.attrs.collapsed,
    };
    return ['div', attrs, 0];
  },
};
