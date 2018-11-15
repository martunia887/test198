import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { TableCssClassName as ClassName } from '../types';

export interface SingleSelectProps {
  view: EditorView;
  node: PMNode;
  getPos: () => number;
}

class SingleSelect extends React.PureComponent<SingleSelectProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { node } = this.props;

    if (node.attrs.color) {
      return (
        <div
          className={ClassName.STATUS_LOZENGE}
          style={{ background: node.attrs.color }}
        >
          {node.attrs.value}
        </div>
      );
    }
    let value = node.attrs.value;
    if (value.indexOf(',') > -1) {
      value = value.split(',').join(',  ');
    }
    return <div>{value}</div>;
  }
}

export default class SingleSelectView extends ReactNodeView
  implements NodeView {
  createDomRef() {
    const dom = document.createElement('div');
    return dom;
  }
  update(node, decorations) {
    return super.update(
      node,
      decorations,
      (currentNode, newNode) => currentNode.attrs.value === newNode.attrs.value,
    );
  }
}

export function createSingleSelectView(portalProviderAPI: PortalProviderAPI) {
  return (node: any, view: any, getPos: () => number): NodeView =>
    new SingleSelectView(
      node,
      view,
      getPos,
      portalProviderAPI,
      { node, view, getPos },
      SingleSelect,
    ).init();
}
