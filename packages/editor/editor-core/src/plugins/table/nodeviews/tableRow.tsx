import { NodeView } from 'prosemirror-view';

export default class Row implements NodeView {
  dom?: HTMLTableRowElement;
  contentDOM?: HTMLTableRowElement;

  constructor() {
    this.dom = this.contentDOM = document.createElement('tr');
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

export const createRowView = (): NodeView => new Row();
