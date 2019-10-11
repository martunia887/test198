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

interface State {
  title: string;
}

export class Expand extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      title: props.node.attrs.title,
    };
  }

  render() {
    const { collapsed } = this.props.node.attrs;
    return (
      <Container>
        <Title>
          <Icon onClick={this.handleClick}>
            {collapsed ? (
              <ChevronRightIcon label="expand" />
            ) : (
              <ChevronDownIcon label="expand" />
            )}
          </Icon>
          <Input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
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
    this.setState({ title: event.target.value });
  };

  private handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { state, dispatch } = this.props.view;
    const { node, pos } = this.props;

    dispatch(
      state.tr.replaceWith(
        pos,
        pos + node.nodeSize,
        state.schema.nodes.expand.createChecked(
          {
            ...node.attrs,
            collapsed: !node.attrs.collapsed,
          },
          node.content,
          node.marks,
        ),
      ),
    );
  };
}
