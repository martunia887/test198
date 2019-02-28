import * as React from 'react';
import {
  ConversationResourceContext,
  FileIdentifier,
  ConversationsContext,
  PageConversations,
  Context,
} from '@atlaskit/media-core';
import { Conversation } from '@atlaskit/conversation';
import { ProviderFactory } from '@atlaskit/editor-common';
import { CommentsSectionWrapper } from './styled';
import { MediaProvider } from '../../../../editor/editor-core';

interface Props {
  identifier: FileIdentifier;
  context: Context;
}

interface State {
  fileId?: string;
}

export class CommentsSection extends React.Component<Props, State> {
  state: State = {};
  dataProviders: ProviderFactory;

  constructor(props: Props) {
    super(props);
    const { context } = props;
    const mediaProvider: MediaProvider = {
      viewContext: Promise.resolve(context),
    };

    this.dataProviders = new ProviderFactory();
    this.dataProviders.setProvider(
      'mediaProvider',
      Promise.resolve(mediaProvider),
    );
  }

  async componentWillMount() {
    const fileId = await this.props.identifier.id;
    this.setState({ fileId });
  }

  render() {
    const { fileId } = this.state;
    const {dataProviders} = this;

    return (
      <CommentsSectionWrapper>
        <ConversationResourceContext.Consumer>
          {provider => {
            if (!fileId) {
              return null;
            }

            return (
              <ConversationsContext.Consumer>
                {({ conversations, objectId }: PageConversations) => {
                  if (!objectId) {
                    return null;
                  }
                  const thisFileConversation = conversations.filter(
                    convo => convo.meta.mediaFileId === fileId,
                  );

                  if (thisFileConversation.length > 0) {
                    const conversation = thisFileConversation[0];
                    return (
                      <Conversation
                        isInline={false}
                        meta={conversation.meta}
                        key={conversation.conversationId}
                        id={conversation.conversationId}
                        objectId={conversation.objectId}
                        provider={provider}
                        dataProviders={dataProviders}
                      />
                    );
                  } else {
                    return (
                      <Conversation
                        isInline={false}
                        key="new-one"
                        meta={{ mediaFileId: fileId }}
                        objectId={objectId}
                        provider={provider}
                      />
                    );
                  }
                }}
              </ConversationsContext.Consumer>
            );
          }}
        </ConversationResourceContext.Consumer>
      </CommentsSectionWrapper>
    );
  }
}
