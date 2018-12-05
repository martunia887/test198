import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory, WithProviders } from '@atlaskit/editor-common';
import { ResourcedMention } from '@atlaskit/mention';

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
  providerFactory: ProviderFactory;
}

export default function MentionNode(props: Props) {
  const { node, providerFactory } = props;
  const { id, text, accessLevel } = node.attrs;

  return (
    <WithProviders
      providerFactory={providerFactory}
      providers={['mentionProvider']}
      renderNode={({ mentionProvider }) => (
        <ResourcedMention
          id={id}
          text={text}
          accessLevel={accessLevel}
          mentionProvider={mentionProvider}
        />
      )}
    />
  );
}
