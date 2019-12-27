import * as React from 'react';
import { MOCK_USERS } from '../example-helpers/MockData';
import {
  getDataProviderFactory,
  MockProvider as ConversationResource,
} from '../example-helpers/MockProvider';
import { Conversation } from '../src';

const provider = new ConversationResource({
  url: 'http://mockservice/',
  user: MOCK_USERS[3],
});

export default class AdditionalCommentActions extends React.Component<
  {},
  { conversationId?: string; shouldRenderAction: boolean }
> {
  state = {
    conversationId: undefined,
    shouldRenderAction: false,
  };

  async componentDidMount() {
    const [conversation] = await provider.getConversations();

    // We decide if we should show a comment action based on the result of
    // an async call. `setTimeout` is here trying to mimic that.
    setTimeout(() => {
      this.setState({ shouldRenderAction: true });
    }, 2000);

    this.setState({
      conversationId: conversation.conversationId,
    });
  }

  renderAdditionalCommentActions = (CommentAction, comment) => {
    return [
      this.state.shouldRenderAction && (
        <CommentAction
          key="create-task"
          onClick={() =>
            alert(`Task created for comment ${comment.commentId}!`)
          }
        >
          Create Task
        </CommentAction>
      ),
    ];
  };

  render() {
    const { conversationId } = this.state;
    if (!conversationId) {
      return null;
    }

    return (
      <Conversation
        // It will only if I update the `key`
        // key={this.state.shouldRenderAction ? '😅' : '🙃'}
        id={conversationId}
        objectId="ari:cloud:platform::conversation/demo"
        provider={provider}
        dataProviders={getDataProviderFactory()}
        renderAdditionalCommentActions={this.renderAdditionalCommentActions}
      />
    );
  }
}
