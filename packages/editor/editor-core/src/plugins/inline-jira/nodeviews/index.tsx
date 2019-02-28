import * as React from 'react';
import styled from 'styled-components';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import { ReactNodeView } from '../../../nodeviews';

// tslint:disable-next-line:variable-name
const Wrapper = styled.span`
  user-select: all;
`;

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
  providerFactory: ProviderFactory;
}

export class JiraCreateNode extends React.Component<Props, {}> {
  render() {
    return <div>Hello world</div>;
  }
}

class InlineJiraView extends ReactNodeView {
  getContentDOM() {
    const dom = document.createElement('div');
    dom.className = 'jiraView-content-wrap';
    return { dom };
  }

  render(props, forwardRef) {
    return <JiraCreateNode view={this.view} />;
  }
}

export default InlineJiraView;
