import { NodeSpec, Node as PMNode } from 'prosemirror-model';

/**
 * @name status_node
 */
export interface InlineLocationDefinition {
  type: 'inlineLocation';
  attrs: {
    name?: string;
    address?: string;
    coords: {
      lat: number;
      lng: number;
    };
  };
}

export const inlineLocation: NodeSpec = {
  inline: true,
  group: 'inline',
  selectable: true,
  draggable: true,
  attrs: {
    name: { default: null },
    address: { default: null },
    coords: { default: { lat: 0, lng: 0 } },
  },
  parseDOM: [
    {
      tag: 'a[data-inline-location]',
      getAttrs: domNode => {
        const dom = domNode as HTMLElement;
        const data = dom.getAttribute('data-location-data');
        return {
          data: data ? JSON.parse(data) : null,
        };
      },
    },
  ],
  toDOM(node: PMNode) {
    const attrs = {
      'data-inline-location': '',
      'data-location-data': node.attrs.data
        ? JSON.stringify(node.attrs.data)
        : '',
    };
    return ['a', { href: node.attrs.address, ...attrs }, node.attrs.address];
  },
};
