import * as React from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import styled from 'styled-components';
import { Node as PMNode } from 'prosemirror-model';
import { Selection } from 'prosemirror-state';
import { EditorView, NodeView } from 'prosemirror-view';
import { Color, Status, StatusStyle } from '@atlaskit/status';
import { colors } from '@atlaskit/theme';
import { pluginKey } from '../plugin';
import { setStatusPickerAt } from '../actions';
import { ReactNodeView, getPosHandler } from '../../../nodeviews';
import InlineNodeWrapper, {
  createMobileInlineDomRef,
} from '../../../ui/InlineNodeWrapper';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { EditorAppearance } from '../../../types';
import { ZeroWidthSpace } from '../../../utils';

const { B100 } = colors;

export const messages = defineMessages({
  placeholder: {
    id: 'fabric.editor.statusPlaceholder',
    defaultMessage: 'Set a status',
    description:
      'Placeholder description for an empty (new) status item in the editor',
  },
});

export interface StyledStatusProps {
  selected: boolean;
  placeholderStyle: boolean;
}

export const StyledStatus = styled.span`
  cursor: pointer;

  display: inline-block;
  border-radius: 5px;
  max-width: 100%;

  /* Prevent responsive layouts increasing height of container by changing
     font size and therefore line-height. */
  line-height: 0;

  opacity: ${(props: StyledStatusProps) => (props.placeholderStyle ? 0.5 : 1)};

  border: 2px solid
    ${(props: StyledStatusProps) => (props.selected ? B100 : 'transparent')};

  * ::selection {
    background-color: transparent;
  }
`;

export interface ContainerProps {
  view: EditorView;
  getPos: getPosHandler;
  text?: string;
  color: Color;
  style?: StatusStyle;
  localId?: string;
}

export interface ContainerState {
  selected: boolean;
}

export class StatusContainerView extends React.Component<
  ContainerProps & InjectedIntlProps,
  ContainerState
> {
  constructor(props: ContainerProps & InjectedIntlProps) {
    super(props);
    this.state = {
      selected: false,
    };
  }

  render() {
    const {
      text,
      color,
      localId,
      style,
      intl: { formatMessage },
    } = this.props;
    const { selected } = this.state;
    const statusText = text ? text : formatMessage(messages.placeholder);

    return (
      <StyledStatus selected={selected} placeholderStyle={!text}>
        <Status
          text={statusText}
          color={color}
          localId={localId}
          style={style}
          onClick={this.handleClick}
        />
      </StyledStatus>
    );
  }

  componentDidMount() {
    const { view } = this.props;
    const { selectionChanges } = pluginKey.getState(view.state);
    if (selectionChanges) {
      selectionChanges.subscribe(this.handleSelectionChange);
    }
  }

  componentWillUnmount() {
    const { view } = this.props;
    const { selectionChanges } = pluginKey.getState(view.state);
    if (selectionChanges) {
      selectionChanges.unsubscribe(this.handleSelectionChange);
    }
  }

  private handleSelectionChange = (
    newSelection: Selection,
    _prevSelection: Selection,
  ) => {
    const { getPos } = this.props;
    const { from, to } = newSelection;
    const statusPos = getPos();
    const selected = from <= statusPos && to > statusPos;

    if (this.state.selected !== selected) {
      this.setState({
        selected,
      });
    }
  };

  private handleClick = (event: React.SyntheticEvent<any>) => {
    if (event.nativeEvent.stopImmediatePropagation) {
      event.nativeEvent.stopImmediatePropagation();
    }
    const { state, dispatch } = this.props.view;
    setStatusPickerAt(state.selection.from)(state, dispatch);
  };
}

export const IntlStatusContainerView = injectIntl(StatusContainerView);

export interface Props {
  editorAppearance?: EditorAppearance;
}

export class StatusNodeView extends ReactNodeView {
  createDomRef() {
    if (this.reactComponentProps.editorAppearance === 'mobile') {
      return createMobileInlineDomRef();
    }

    return super.createDomRef();
  }

  setDomAttrs(node: PMNode, element: HTMLElement) {
    const { color, localId, style } = node.attrs;

    element.dataset.color = color;
    element.dataset.localId = localId;
    element.dataset.style = style;
  }

  render(props: Props) {
    const { editorAppearance } = props;
    const { text, color, localId, style } = this.node.attrs;

    return (
      <InlineNodeWrapper appearance={editorAppearance}>
        <IntlStatusContainerView
          view={this.view}
          getPos={this.getPos}
          text={text}
          color={color}
          style={style}
          localId={localId}
        />
        {editorAppearance !== 'mobile' && ZeroWidthSpace}
      </InlineNodeWrapper>
    );
  }
}

export default function statusNodeView(
  portalProviderAPI: PortalProviderAPI,
  editorAppearance?: EditorAppearance,
) {
  return (node: PMNode, view: EditorView, getPos: getPosHandler): NodeView =>
    new StatusNodeView(node, view, getPos, portalProviderAPI, {
      editorAppearance,
    }).init();
}
