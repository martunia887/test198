import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { findDomRefAtPos } from 'prosemirror-utils';
import Textfield from '@atlaskit/textfield';
import {
  Popup,
  akEditorFloatingOverlapPanelZIndex,
} from '@atlaskit/editor-common';
import { toggleRefsMenu } from '../../actions';

export interface RefsMenuProps {
  editorView: EditorView;
  isOpen: boolean;
  nodePosition?: number;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
}

export default class RefsMenu extends React.Component<RefsMenuProps> {
  render() {
    const {
      mountPoint,
      boundariesElement,
      scrollableElement,
      editorView,
      isOpen,
      nodePosition,
    } = this.props;

    if (!isOpen || typeof nodePosition !== 'number') {
      return null;
    }
    const node = editorView.state.doc.nodeAt(nodePosition);
    const domAtPos = editorView.domAtPos.bind(editorView);
    const target = findDomRefAtPos(nodePosition, domAtPos);
    if (!target || !node) {
      return null;
    }

    return (
      <Popup
        alignX="center"
        alignY="bottom"
        target={target as HTMLElement}
        mountTo={mountPoint}
        offset={[0, 40]}
        boundariesElement={boundariesElement}
        scrollableElement={scrollableElement}
        fitHeight={40}
        fitWidth={165}
        // z-index value below is to ensure that this menu is above other floating menu
        // in table, but below floating dialogs like typeaheads, pickers, etc.
        zIndex={akEditorFloatingOverlapPanelZIndex}
      >
        <Textfield
          name="event-handlers"
          onChange={this.handleOnChange}
          onBlur={this.dismiss}
          value={node.attrs.reference}
        />
      </Popup>
    );
  }

  private dismiss = () => {
    const { editorView } = this.props;
    const { state, dispatch } = editorView;
    toggleRefsMenu()(state, dispatch);
  };

  private handleOnChange = event => {
    const { nodePosition, editorView } = this.props;
    const { state, dispatch } = editorView;
    if (typeof nodePosition !== 'number') {
      return;
    }
    const node = state.doc.nodeAt(nodePosition);
    if (!node) {
      return;
    }
    dispatch(
      state.tr.setNodeMarkup(nodePosition, node.type, {
        ...node.attrs,
        reference: event.target.value,
      }),
    );
  };
}
