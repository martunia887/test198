import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { isNodeSelection } from 'prosemirror-utils';
import { Popup } from '@atlaskit/editor-common';
import { gridSize } from '@atlaskit/theme';
import { Input } from './styles';
import { messages } from './Expand';
import { updateExpandTitle, setShouldFocusTitle } from '../commands';

interface Props {
  view: EditorView;
  expandRef?: HTMLDivElement | null;
  expandNode?: PMNode | null;
  expandPosition?: number;
  parentLayout?: string;
  shouldFocusTitle?: boolean;
  containerWidth?: number;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
}

interface State {
  title: string;
}

const inputOffset = gridSize() * 6 - gridSize() / 2 + 2;

class FloatingTitle extends React.PureComponent<
  Props & InjectedIntlProps,
  State
> {
  constructor(props: Props & InjectedIntlProps) {
    super(props);

    this.state = {
      title: props.expandNode ? props.expandNode.attrs.title : '',
    };
  }

  componentDidUpdate(prevProps: Props & InjectedIntlProps) {
    if (prevProps.expandNode !== this.props.expandNode) {
      this.setState({
        title: this.props.expandNode ? this.props.expandNode.attrs.title : '',
      });
    }
  }

  render() {
    const {
      intl: { formatMessage },
      expandRef,
      mountPoint,
      scrollableElement,
      expandNode,
      view,
    } = this.props;
    if (!expandNode || !expandRef || isNodeSelection(view.state.selection)) {
      return null;
    }
    const target = expandRef.querySelector(
      '[data-expand-title]',
    ) as HTMLElement;
    if (!target) {
      return null;
    }

    return (
      <Popup
        alignX="left"
        alignY="start"
        target={target}
        mountTo={mountPoint}
        boundariesElement={target}
        scrollableElement={scrollableElement}
        offset={[0, 0.5]}
        forcePlacement
        allowOutOfBounds
      >
        <Input
          type="text"
          innerRef={this.handleRef}
          value={this.state.title}
          width={expandRef.offsetWidth - inputOffset}
          onChange={this.onChange}
          placeholder={formatMessage(messages.expandPlaceholderText)}
        />
      </Popup>
    );
  }

  private handleRef = (ref: HTMLElement | null) => {
    if (ref && this.props.shouldFocusTitle) {
      ref.focus();
      // prevend handling click by GapCursor :0
      setTimeout(() => {
        const { state, dispatch } = this.props.view;
        setShouldFocusTitle(false)(state, dispatch);
      }, 300);
    }
  };

  private onChange = (event: React.SyntheticEvent) => {
    if (!this.props.expandNode) {
      return;
    }
    const { value } = event.target as HTMLInputElement;
    if (this.props.expandNode.attrs.title !== value) {
      this.setState({ title: value }, this.updateTitle);
    }
  };

  private updateTitle = () => {
    const { expandPosition, expandNode } = this.props;
    if (!expandNode || typeof expandPosition !== 'number') {
      return;
    }
    const { state, dispatch } = this.props.view;
    if (expandNode.attrs.title !== this.state.title) {
      updateExpandTitle(this.state.title, expandNode, expandPosition)(
        state,
        dispatch,
      );
    }
  };
}

export default injectIntl(FloatingTitle);
