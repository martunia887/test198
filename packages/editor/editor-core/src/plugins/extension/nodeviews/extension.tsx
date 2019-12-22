import * as React from 'react';
import { ProviderFactory, ExtensionHandlers } from '@atlaskit/editor-common';
import { Node as PmNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';

import { ReactNodeView } from '../../../nodeviews';
import { ForwardRef, getPosHandler } from '../../../nodeviews/ReactNodeView';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { ZeroWidthSpace } from '../../../utils';
import Extension from '../ui/Extension';

export interface Props {
  node: PmNode;
  providerFactory: ProviderFactory;
  view: EditorView;
}

class ExtensionNode extends ReactNodeView {
  ignoreMutation(
    mutation: MutationRecord | { type: 'selection'; target: Element },
  ) {
    // Extensions can perform async operations that will change the DOM.
    // To avoid having their tree rebuilt, we need to ignore the mutation
    // for atom based extensions if its not a layout, we need to give
    // children a chance to recalc
    return (
      this.node.type.isAtom ||
      (mutation.type !== 'selection' &&
        mutation.attributeName !== 'data-layout')
    );
  }

  getContentDOM() {
    if (this.node.isInline) {
      return;
    }

    const dom = document.createElement('div');
    dom.className = `${this.node.type.name}-content-dom-wrapper`;
    return { dom };
  }

  render(
    props: {
      providerFactory: ProviderFactory;
      extensionHandlers: ExtensionHandlers;
    },
    forwardRef: ForwardRef,
  ) {
    return (
      <span>
        <Extension
          editorView={this.view}
          node={this.node}
          providerFactory={props.providerFactory}
          handleContentDOMRef={forwardRef}
          extensionHandlers={props.extensionHandlers}
        />
        {this.node.type.name === 'inlineExtension' && ZeroWidthSpace}
      </span>
    );
  }
}

export default function ExtensionNodeView(
  portalProviderAPI: PortalProviderAPI,
  providerFactory: ProviderFactory,
  extensionHandlers: ExtensionHandlers,
) {
  return (node: PmNode, view: EditorView, getPos: getPosHandler): NodeView => {
    return new ExtensionNode(node, view, getPos, portalProviderAPI, {
      providerFactory,
      extensionHandlers,
    }).init();
  };
}
