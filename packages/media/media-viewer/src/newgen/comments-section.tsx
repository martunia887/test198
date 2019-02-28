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
                  console.log(
                    'thisFileConversation',
                    thisFileConversation.length,
                  );

                  const list = thisFileConversation.map(conversation => {
                    return (
                      <Conversation
                        meta={conversation.meta}
                        key={conversation.conversationId}
                        id={conversation.conversationId}
                        objectId={conversation.objectId}
                        provider={provider}
                        dataProviders={dataProviders}
                      />
                    );
                  });

                  list.push(
                    <Conversation
                      key="new-one"
                      isExpanded={true}
                      meta={{ mediaFileId: fileId }}
                      objectId={objectId}
                      provider={provider}
                    />,
                  );
                  console.log('rendering ', list.length, 'components');
                  return list;
                }}
              </ConversationsContext.Consumer>
            );
          }}
        </ConversationResourceContext.Consumer>
      </CommentsSectionWrapper>
    );
  }
}
