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

export interface RefsMenuState {
  value: string;
}

export default class RefsMenu extends React.Component<
  RefsMenuProps,
  RefsMenuState
> {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  componentDidUpdate() {
    const { editorView, nodePosition } = this.props;
    if (typeof nodePosition === 'number') {
      const node = editorView.state.doc.nodeAt(nodePosition);
      if (node && !this.state.value) {
        this.setState({
          value: node.attrs.title,
        });
      }
    }
  }

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
    const target = findDomRefAtPos(nodePosition, domAtPos) as HTMLElement;
    if (!target || !node) {
      return null;
    }

    return (
      <Popup
        alignX="left"
        alignY="top"
        target={target}
        mountTo={mountPoint}
        offset={[0, -58]}
        boundariesElement={boundariesElement}
        scrollableElement={scrollableElement}
        // z-index value below is to ensure that this menu is above other floating menu
        // in table, but below floating dialogs like typeaheads, pickers, etc.
        zIndex={akEditorFloatingOverlapPanelZIndex}
      >
        <Textfield
          autoFocus
          name="event-handlers"
          onChange={this.handleOnChange}
          onBlur={this.applyTitle}
          onKeyPress={this.handleKeyPress}
          value={this.state.value}
          style={{ width: target.offsetWidth - 16 }}
        />
      </Popup>
    );
  }

  private applyTitle = () => {
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
        title: this.state.value,
      }),
    );

    toggleRefsMenu()(editorView.state, dispatch);
  };

  private handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.applyTitle();
    }
  };

  private handleOnChange = event => {
    this.setState({
      value: event.target.value,
    });
  };
}
