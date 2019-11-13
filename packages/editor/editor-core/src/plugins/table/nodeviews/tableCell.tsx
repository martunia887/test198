import { Node as PmNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { setCellAttrs } from '@atlaskit/adf-schema';

type CellType = HTMLTableCellElement | HTMLTableHeaderCellElement;

export default class Cell implements NodeView {
  dom?: CellType;
  contentDOM?: CellType;

  constructor(node: PmNode, view: EditorView) {
    const { tableCell } = view.state.schema.nodes;
    const dom = document.createElement(node.type === tableCell ? 'td' : 'th');

    this.dom = dom;
    this.contentDOM = dom;

    const attrs = setCellAttrs(node, dom);
    (Object.keys(attrs) as Array<keyof typeof attrs>).forEach(attr => {
      dom.setAttribute(attr, String(attrs[attr]));
    });
  }

  // we mutate the style attribute when reordering
  ignoreMutation() {
    return true;
  }

  destroy() {
    this.dom = undefined;
    this.contentDOM = undefined;
  }
}

export const createCellView = (node: PmNode, view: EditorView): NodeView =>
  new Cell(node, view);
