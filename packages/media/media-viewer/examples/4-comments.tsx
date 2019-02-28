import * as React from 'react';
import {
  ConversationResourceContext,
  ConversationsContext,
  PageConversations,
} from '@atlaskit/media-core';
import { imageFileId, smallImageFileId } from '@atlaskit/media-test-helpers';
import RendererDemo from '../../../editor/renderer/examples/helper/RendererDemo';
import { MOCK_USERS } from '../../../editor/conversation/example-helpers/MockData';
import {
  ConversationInterface,
  ConversationResource,
} from '@atlaskit/conversation';
import { ConversationAuth } from '../../../editor/conversation/src/api/ConversationResource';

const conversationAuthProvider = () => {
  const url =
    'https://api-private.stg.atlassian.com/media-playground/api/token/user/convo';
  let auth: Promise<ConversationAuth> | undefined;

  return async () => {
    if (auth) {
      return auth;
    }

    auth = new Promise<ConversationAuth>(async resolve => {
      const newAuth = await (await fetch(url, {
        credentials: 'include',
      })).json();

      resolve(newAuth);
    });

    return auth;
  };
};

const authProvider = conversationAuthProvider();
export const conversationProvider = new ConversationResource({
  url: 'https://pf-conversation-service.us-west-2.staging.atl-paas.net',
  user: MOCK_USERS[3],
  authProvider,
});
authProvider().then(auth => {
  conversationProvider.updateUser({
    ...MOCK_USERS[3],
    account_id: auth.userAri,
  });
});

const doc = {
  type: 'doc',
  version: 1,
  content: [
    {
      type: 'mediaSingle',
      attrs: {
        layout: 'full-width',
      },
      content: [
        {
          type: 'media',
          attrs: {
            id: smallImageFileId.id,
            type: 'file',
            collection: 'MediaServicesSample',
            width: 250,
            height: 30,
          },
        },
      ],
    },
    {
      type: 'mediaSingle',
      attrs: {
        layout: 'full-width',
      },
      content: [
        {
          type: 'media',
          attrs: {
            id: imageFileId.id,
            type: 'file',
            collection: 'MediaServicesSample',
            width: 100,
            height: 10,
          },
        },
      ],
    },
  ],
};

interface State {
  conversations: ConversationInterface[];
}

const PAGE_OBJECT_ID = 'ari:cloud:platform::conversation/media-viewer-demo';

export default class Example extends React.PureComponent<{}, State> {
  state: State = {
    conversations: [],
  };

  async componentWillMount() {
    // TODO usubscribe on unmount
    const usubscribe = conversationProvider.store.subscribe(() => {
      const state = conversationProvider.store.getState();
      if (state) {
        // TODO This check is not taking into account edits of comments.
        if (this.state.conversations.length !== state.conversations.length) {
          const newConversations = state.conversations;
          this.sortConversations(newConversations);
          this.setState({ conversations: state.conversations });
        }
      }
    });

    const conversations = await conversationProvider.getConversations(
      PAGE_OBJECT_ID,
    );
    this.sortConversations(conversations);
    this.setState({ conversations });
  }

  private sortConversations = (convs: ConversationInterface[]) =>
    convs.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));

  render() {
    const { conversations } = this.state;

    const pageConversations: PageConversations = {
      conversations,
      objectId: PAGE_OBJECT_ID,
    };
    return (
      <ConversationResourceContext.Provider value={conversationProvider}>
        <ConversationsContext.Provider value={pageConversations}>
          <RendererDemo
            document={doc}
            withProviders={true}
            serializer="react"
          />
        </ConversationsContext.Provider>
      </ConversationResourceContext.Provider>
    );
  }
}
