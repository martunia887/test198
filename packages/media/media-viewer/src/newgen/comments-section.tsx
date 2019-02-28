import * as React from 'react';
import {
  ConversationContext,
  FileIdentifier,
  createMediaObjectId,
} from '@atlaskit/media-core';
import { Conversation } from '@atlaskit/conversation';
import { ProviderFactory } from '@atlaskit/editor-common';
import { CommentsSectionWrapper } from './styled';
import { WithConversations } from '../../../media-card/src/root/card';

interface Props {
  identifier: FileIdentifier;
}

interface State {
  objectId?: string;
}

export class CommentsSection extends React.Component<Props, State> {
  state: State = {};

  async componentWillMount() {
    const objectId = await createMediaObjectId(await this.props.identifier.id);
    this.setState({ objectId });
  }

  render() {
    const { objectId } = this.state;
    const dataProviders = new ProviderFactory();
    const mediaProvider = {};
    dataProviders.setProvider('mediaProvider', mediaProvider);

    return (
      <CommentsSectionWrapper>
        <ConversationContext.Consumer>
          {provider => {
            if (!objectId) {
              return null;
            }

            return (
              <WithConversations objectId={objectId} provider={provider}>
                {conversations => {
                  console.log(conversations);
                  if (conversations.length) {
                    return conversations.map(conversation => {
                      return (
                        <Conversation
                          key={conversation.conversationId}
                          id={conversation.conversationId}
                          objectId={conversation.objectId}
                          provider={provider}
                          dataProviders={dataProviders}
                        />
                      );
                    });
                  }

                  return (
                    <Conversation objectId={objectId} provider={provider} />
                  );
                }}
              </WithConversations>
            );
          }}
        </ConversationContext.Consumer>
      </CommentsSectionWrapper>
    );
  }
}
