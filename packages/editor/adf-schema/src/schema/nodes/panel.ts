import { NodeSpec, Node, AttributeSpec } from 'prosemirror-model';
import { ParagraphDefinition as Paragraph } from './paragraph';
import { OrderedListDefinition as OrderedList } from './ordered-list';
import { BulletListDefinition as BulletList } from './bullet-list';
import { HeadingDefinition as Heading } from './heading';

export type PanelType =
  | 'info'
  | 'note'
  | 'tip'
  | 'warning'
  | 'error'
  | 'success'
  | 'emoji';

export interface PanelAttributes {
  panelType: PanelType;
  panelIcon?: string;
  panelColor?: string;
}

/**
 * @name panel_node
 */
export interface PanelDefinition {
  type: 'panel';
  attrs: PanelAttributes;
  /**
   * @minItems 1
   */
  content: Array<Paragraph | Heading | OrderedList | BulletList>;
}

export interface DOMAttributes {
  [propName: string]: string;
}

export const panelWithIconAndColor: NodeSpec = {
  group: 'block',
  content: '(paragraph | heading | bulletList | orderedList)+',
  attrs: {
    panelType: { default: 'info' },
  },
  parseDOM: [
    {
      tag: 'div[data-panel-type]',
      getAttrs: dom => ({
        panelType: (dom as HTMLElement).getAttribute('data-panel-type')!,
        panelIcon: (dom as HTMLElement).getAttribute('data-panel-icon')!,
        panelColor: (dom as HTMLElement).getAttribute('data-panel-color')!,
      }),
    },
  ],
  toDOM(node: Node) {
    const panelType = node.attrs['panelType'];
    const panelIcon = node.attrs['panelIcon'];
    const panelColor = node.attrs['panelColor'];
    const attrs: DOMAttributes = {
      'data-panel-type': panelType,
      'data-panel-icon': panelIcon,
      'data-panel-color': panelColor,
    };
    return ['div', attrs, ['div', {}, 0]];
  },
};

// TODO: add panelIcon and panelColor attributes here only depending on UNSAFE_allowCustomPanels flag
export const panel: NodeSpec = {
  group: 'block',
  content: '(paragraph | heading | bulletList | orderedList)+',
  attrs: {
    panelType: { default: 'info' },
    panelIcon: { default: undefined },
    panelColor: { default: undefined },
  },
  parseDOM: [
    {
      tag: 'div[data-panel-type]',
      getAttrs: dom => ({
        panelType: (dom as HTMLElement).getAttribute('data-panel-type')!,
        panelIcon: (dom as HTMLElement).getAttribute('data-panel-icon')!,
      }),
    },
  ],
  toDOM(node: Node) {
    const panelType = node.attrs['panelType'];
    const panelIcon = node.attrs['panelIcon'];
    const attrs: DOMAttributes = {
      'data-panel-type': panelType,
      'data-panel-icon': panelIcon,
    };
    return ['div', attrs, ['div', {}, 0]];
  },
};
