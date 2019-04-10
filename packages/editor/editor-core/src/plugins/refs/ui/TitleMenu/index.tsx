import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import {
  Popup,
  akEditorFloatingOverlapPanelZIndex,
} from '@atlaskit/editor-common';
import { updateTitleTarget } from '../../actions';
import { RefsCssClassName as ClassName } from '../../consts';

export interface TitleMenuProps {
  editorView: EditorView;
  target: HTMLElement;
  nodePosition?: number;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
}

export interface TitleMenuState {
  value: string;
}

export default class TitleMenu extends React.Component<
  TitleMenuProps,
  TitleMenuState
> {
  constructor(props: TitleMenuProps) {
    super(props);

    this.state = {
      value: props.target.innerText,
    };
  }

  componentDidUpdate() {
    const { editorView, nodePosition } = this.props;
    if (typeof nodePosition === 'number') {
      const node = editorView.state.doc.nodeAt(nodePosition);
      const { value } = this.state;
      if (node && !value && value !== node.attrs.title) {
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
      target,
    } = this.props;

    return (
      <Popup
        alignX="left"
        alignY="top"
        target={target}
        mountTo={mountPoint}
        offset={[0, -40]}
        boundariesElement={boundariesElement}
        scrollableElement={scrollableElement}
        zIndex={akEditorFloatingOverlapPanelZIndex}
      >
        <input
          ref={ref => {
            if (ref) {
              // avoid scrolling the browser window
              setTimeout(() => ref.focus());
            }
          }}
          className={`${ClassName.TITLE_MENU}`}
          name="title-menu"
          onChange={this.handleOnChange}
          onBlur={this.updateTitle}
          onKeyPress={this.handleKeyPress}
          value={this.state.value}
          style={{ width: target.offsetWidth - 16 }}
        />
      </Popup>
    );
  }

  private updateTitle = () => {
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

    this.setState({ value: '' });
    updateTitleTarget()(editorView.state, dispatch);
  };

  private handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      this.updateTitle();
    }
  };

  private handleOnChange = (event: any) => {
    this.setState({
      value: event.target.value,
    });
  };
}
