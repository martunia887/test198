import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { Node as PmNode } from 'prosemirror-model';
import { Container, Input, Icon, Content, Title } from './styles';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';

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
      <Container>
        <Title>
          <Icon onClick={this.handleClick}>
            {collapsed ? (
              <ChevronRightIcon label={label} />
            ) : (
              <ChevronDownIcon label={label} />
            )}
          </Icon>
          <Input type="text" value={title} onChange={this.handleChange} />
        </Title>
        {collapsed ? null : (
          <Content
            innerRef={ref => {
              this.props.contentDOMRef(ref);
            }}
          />
        )}
      </Container>
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { state, dispatch } = this.props.view;
    const { node, pos } = this.props;

    dispatch(
      state.tr.setNodeMarkup(
        pos,
        node.type,
        {
          ...node.attrs,
          title: event.target.value,
        },
        node.marks,
      ),
    );
  };

  private handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { state, dispatch } = this.props.view;
    const { node, pos } = this.props;

    dispatch(
      state.tr.setNodeMarkup(
        pos,
        node.type,
        {
          ...node.attrs,
          collapsed: !node.attrs.collapsed,
        },
        node.marks,
      ),
    );
  };
}
