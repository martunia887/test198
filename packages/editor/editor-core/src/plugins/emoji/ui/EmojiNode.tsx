import React, { FunctionComponent } from 'react';
import { Node as ProsemirrorNode } from 'prosemirror-model';
import Emoji from './Emoji';
import { useProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { EmojiAttributes } from '@atlaskit/adf-schema';

interface EmojiNodeProps {
  node: ProsemirrorNode;
}

export const EmojiNode: FunctionComponent<EmojiNodeProps> = ({ node }) => {
  const providerFactory = useProviderFactory();

  const { id, shortName, text } = node.attrs as EmojiAttributes;

  return (
    <Emoji
      providers={providerFactory}
      id={id}
      shortName={shortName}
      fallback={text}
    />
  );
};
