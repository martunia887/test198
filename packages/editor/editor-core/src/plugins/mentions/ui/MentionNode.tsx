import React, { FunctionComponent } from 'react';
import { Node as ProsemirrorNode } from 'prosemirror-model';
import Mention from './Mention';
import { MentionAttributes } from '@atlaskit/adf-schema';
import { useProviderFactory } from '@atlaskit/editor-common/provider-factory';

export interface MentionNodeProps {
  node: ProsemirrorNode;
}

export const MentionNode: FunctionComponent<MentionNodeProps> = ({ node }) => {
  const providerFactory = useProviderFactory();

  const { id, text, accessLevel } = node.attrs as MentionAttributes;

  return (
    <Mention
      id={id}
      text={text || ''}
      accessLevel={accessLevel}
      providers={providerFactory}
    />
  );
};
