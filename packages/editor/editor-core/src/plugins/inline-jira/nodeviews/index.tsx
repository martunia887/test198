import * as React from 'react';
import styled from 'styled-components';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';

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

export default class JiraCreateNode extends React.PureComponent<Props, {}> {
  render() {
    return <p>hello</p>;
  }
}
