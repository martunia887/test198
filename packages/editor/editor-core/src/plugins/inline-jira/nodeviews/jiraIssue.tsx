import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import { EditorAppearance } from '../../../types';
import styled from 'styled-components';

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
  providerFactory: ProviderFactory;
  editorAppearance: EditorAppearance;
}

export const Icon = styled.img`
  ${props => {
    return `
      src: ${props.src};
    `;
  }};
  width: 16px;
  height: 16px;
  margin-right: 5px;
  vertical-align: middle;
`;

export default class JiraIssue extends React.PureComponent<Props, {}> {
  render() {
    const { node } = this.props;
    const { key, priority, type } = node.attrs.data;

    return (
      <div>
        <Icon src={priority.iconUrl} />
        <Icon src={type.iconUrl} />
        <span>{key}</span>
      </div>
    );
  }
}
