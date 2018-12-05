import * as React from 'react';
import styled from 'styled-components';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory, WithProviders } from '@atlaskit/editor-common';
import { ResourcedEmoji } from '@atlaskit/emoji';

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

export default function EmojiNode(props: Props) {
  const { node, providerFactory } = props;
  const { shortName, id, text } = node.attrs;

  return (
    <Wrapper>
      <WithProviders
        providerFactory={providerFactory}
        providers={['emojiProvider']}
        renderNode={({ emojiProvider }) => (
          <ResourcedEmoji
            emojiId={{ id, fallback: text, shortName }}
            emojiProvider={emojiProvider}
            showTooltip={true}
          />
        )}
      />
    </Wrapper>
  );
}
