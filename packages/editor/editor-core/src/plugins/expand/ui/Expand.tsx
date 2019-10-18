import * as React from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import { EditorView } from 'prosemirror-view';
import { Node as PmNode } from 'prosemirror-model';
import { findParentNodeOfTypeClosestToPos } from 'prosemirror-utils';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import Tooltip from '@atlaskit/tooltip';
import { Container, Input, Icon, Content, Title } from './styles';
import {
  selectExpand,
  updateExpandTitle,
  setCursorInsideExpand,
} from '../commands';

export const messages = defineMessages({
  expand: {
    id: 'fabric.editor.expand',
    defaultMessage: 'Expand',
    description: 'Expand the node',
  },
  collapse: {
    id: 'fabric.editor.collapse',
    defaultMessage: 'Collapse',
    description: 'Collapse the node',
  },
});

interface Props {
  node: PmNode;
  view: EditorView;
  contentDOMRef: (node: HTMLElement | null) => void;
  pos: number;
}

interface State {
  collapsed: boolean;
}

class Expand extends React.PureComponent<Props & InjectedIntlProps, State> {
  state = {
    collapsed: false,
  };

  render() {
    const {
      node,
      intl: { formatMessage },
    } = this.props;
    const { title } = node.attrs;
    const label = this.props.node.type.name;

    return (
      <Container onClick={this.onSelect}>
        <Title onClick={this.onContentClick}>
          <Tooltip
            content={formatMessage(
              this.state.collapsed ? messages.expand : messages.collapse,
            )}
            position="top"
          >
            <Icon onClick={this.onCollapse}>
              {this.state.collapsed ? (
                <ChevronRightIcon label={label} />
              ) : (
                <ChevronDownIcon label={label} />
              )}
            </Icon>
          </Tooltip>
          <Input
            type="text"
            value={title}
            onChange={this.onChange}
            onFocus={this.onFocus}
          />
        </Title>
        {this.state.collapsed ? null : (
          <Content
            onClick={this.onContentClick}
            innerRef={ref => {
              this.props.contentDOMRef(ref);
            }}
          />
        )}
      </Container>
    );
  }

  private onContentClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
  };

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { state, dispatch } = this.props.view;
    const pos = this.getPosFromInput(event.target);
    updateExpandTitle(event.target.value, pos)(state, dispatch);
  };

  private onFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { view } = this.props;
    const { tr } = view.state;
    const pos = this.getPosFromInput(event.target);
    view.dispatch(setCursorInsideExpand(pos, tr, 1));
  };

  private onCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  private onSelect = () => {
    const { state, dispatch } = this.props.view;
    selectExpand(this.props.pos)(state, dispatch);
  };

  private getPosFromInput = (target: HTMLElement): number => {
    const { schema, doc } = this.props.view.state;
    const pos = this.props.view.posAtDOM(target, 0);
    const node = findParentNodeOfTypeClosestToPos(doc.resolve(pos), [
      schema.nodes.nestedExpand,
      schema.nodes.expand,
    ]);
    return node ? node.pos : this.props.pos;
  };
}

export default injectIntl(Expand);
