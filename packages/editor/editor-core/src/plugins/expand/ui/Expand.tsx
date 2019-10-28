import * as React from 'react';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import { EditorView } from 'prosemirror-view';
import { Node as PmNode } from 'prosemirror-model';
import { Expand as CommonExpand, ExpandProps } from '@atlaskit/editor-common';
import { Title, Content } from './styles';
import { selectExpand, setShouldFocusTitle } from '../commands';
import { getPluginState } from '../pm-plugins/main';
import { closestElement } from '../../../utils';

export const messages = defineMessages({
  expandPlaceholderText: {
    id: 'fabric.editor.expandPlaceholder',
    defaultMessage: 'Give this expand a title...',
    description: 'Placeholder text for an expand node title input field',
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
      contentDOMRef,
    } = this.props;
    const { title } = node.attrs;

    return (
      <CommonExpand
        title={title}
        editable={true}
        nodeType={node.type.name as ExpandProps['nodeType']}
        onContainerClick={this.onSelect}
        renderContent={
          <Content onClick={this.onContentClick} innerRef={contentDOMRef} />
        }
        renderTitle={
          <Title
            onMouseDown={this.onTitleFocus}
            onClick={this.onTitleClick}
            data-expand-title
          >
            {title ? (
              title
            ) : (
              <span>{formatMessage(messages.expandPlaceholderText)}</span>
            )}
          </Title>
        }
      />
    );
  }

  private onContentClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
  };

  private onSelect = () => {
    const { state, dispatch } = this.props.view;
    selectExpand(this.props.pos)(state, dispatch);
  };

  // sets title input field in focus
  private onTitleFocus = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    const { state, dispatch } = this.props.view;
    const expandRef = closestElement(
      event.target as HTMLDivElement,
      '[data-node-type="expand"], [data-node-type="nestedExpand"]',
    ) as HTMLDivElement;
    if (getPluginState(state).expandRef !== expandRef) {
      setShouldFocusTitle(true)(state, dispatch);
    }
  };

  // prevents expand from collapsing on title click
  private onTitleClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
  };
}

export default injectIntl(Expand);
