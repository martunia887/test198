import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { Node as PmNode } from 'prosemirror-model';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import { Container, Input, Icon, Content, Title } from './styles';
import { selectExpand, collapseExpand, updateExpandTitle } from '../commands';

interface Props {
  node: PmNode;
  view: EditorView;
  contentDOMRef: (node: HTMLElement | null) => void;
  pos: number;
}

export class Expand extends React.PureComponent<Props> {
  render() {
    const { node } = this.props;
    const { collapsed, title } = node.attrs;
    const label = this.props.node.type.name;

    return (
      <Container onClick={this.onSelect}>
        <Title onClick={this.onContentClick}>
          <Icon onClick={this.onCollapse}>
            {collapsed ? (
              <ChevronRightIcon label={label} />
            ) : (
              <ChevronDownIcon label={label} />
            )}
          </Icon>
          <Input type="text" value={title} onChange={this.onChange} />
        </Title>
        {collapsed ? null : (
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
    updateExpandTitle(event.target.value)(state, dispatch);
  };

  private onCollapse = () => {
    const { state, dispatch } = this.props.view;
    collapseExpand()(state, dispatch);
  };

  private onSelect = () => {
    const { state, dispatch } = this.props.view;
    selectExpand()(state, dispatch);
  };
}
