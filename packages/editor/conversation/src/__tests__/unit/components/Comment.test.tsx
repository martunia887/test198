import AkAvatar from '@atlaskit/avatar';
import AkComment, { CommentAction, CommentAuthor } from '@atlaskit/comment';
import { ConnectedReactionsView } from '@atlaskit/reactions';
import { mount, shallow, ReactWrapper } from 'enzyme';
import * as React from 'react';
import {
  mockComment,
  mockInlineComment,
  MOCK_USERS,
} from '../../../../example-helpers/MockData';
import { getDataProviderFactory } from '../../../../example-helpers/MockProvider';
import Comment, { DeletedMessage } from '../../../../src/components/Comment';
import Editor from '../../../../src/components/Editor';
import CommentContainer from '../../../../src/containers/Comment';
import { User } from '../../../model';

// @ts-ignore
function findEditAction(comment) {}
// avoid polluting test logs with error message in console
// please ensure you fix it if you expect console.error to be thrown
// tslint:disable-next-line:no-console
let consoleError = console.error;
describe('Comment', () => {
  const defaultProps = {
    sendAnalyticsEvent: () => {},
  };

  let comment: any;
  beforeEach(() => {
    // tslint:disable-next-line:no-console
    console.error = jest.fn();
  });
  afterEach(() => {
    // tslint:disable-next-line:no-console
    console.error = consoleError;
  });
  describe('rendering', () => {
    beforeEach(() => {
      comment = shallow(
        <Comment
          {...defaultProps}
          conversationId={mockComment.conversationId}
          comment={mockComment}
        />,
      );
    });

    it('should render as AkComment', () => {
      expect(comment.first().is(AkComment)).toBe(true);
    });

    it('should render author', () => {
      expect(comment.first().props()).toHaveProperty(
        'author',
        <CommentAuthor>{mockComment.createdBy.name}</CommentAuthor>,
      );
    });

    it('should render avatar', () => {
      expect(comment.first().props()).toHaveProperty(
        'avatar',
        <AkAvatar
          src={mockComment.createdBy.avatarUrl}
          name={mockComment.createdBy.name}
          enableTooltip={true}
        />,
      );
    });

    it('should render editor in reply-mode', () => {
      comment.setState({
        isReplying: true,
      });

      expect(comment.find(Editor).length).toBe(1);
    });

    it('should render child-comments if any', () => {
      const comment = shallow(
        <Comment
          {...defaultProps}
          conversationId={mockComment.conversationId}
          comment={mockComment}
          comments={[mockInlineComment]}
        />,
      );

      expect(comment.first().find(CommentContainer).length).toBe(1);
    });

    it('should render a message for deleted comments', () => {
      const deletedComment = {
        ...mockComment,
        deleted: true,
      };

      const deleted = mount(
        <Comment
          {...defaultProps}
          conversationId={mockComment.conversationId}
          comment={deletedComment}
        />,
      );
      expect(deleted.find(DeletedMessage).length).toBe(1);

      deleted.unmount();
    });
  });

  describe('reply link', () => {
    const [user] = MOCK_USERS;

    it('should render reply link if user is set', () => {
      const comment = mount(
        <Comment
          {...defaultProps}
          conversationId={mockComment.conversationId}
          comment={mockComment}
          user={user}
        />,
      );

      const replyLink = comment
        .first()
        .find(CommentAction)
        .findWhere(item => item.is(CommentAction) && item.text() === 'Reply')
        .first();

      expect(replyLink.length).toEqual(1);
      comment.unmount();
    });

    it('should not render reply link if user is not set', () => {
      const comment = mount(
        <Comment
          {...defaultProps}
          conversationId={mockComment.conversationId}
          comment={mockComment}
        />,
      );

      const replyLink = comment
        .first()
        .find(CommentAction)
        .findWhere(item => item.is(CommentAction) && item.text() === 'Reply')
        .first();

      expect(replyLink.length).toEqual(0);
      comment.unmount();
    });
  });

  describe('edit link', () => {
    let user;
    let editLink: ReactWrapper;
    let onUpdateComment: jest.Mock;

    beforeEach(() => {
      user = MOCK_USERS[0];

      onUpdateComment = jest.fn();

      comment = mount(
        <Comment
          {...defaultProps}
          conversationId={mockComment.conversationId}
          comment={mockComment}
          user={user}
          onUpdateComment={onUpdateComment}
        />,
      );

      editLink = comment
        .first()
        .find(CommentAction)
        .findWhere(
          (item: ReactWrapper) =>
            item.is(CommentAction) && item.text() === 'Edit',
        )
        .first();
    });

    afterEach(() => {
      comment.unmount();
    });

    it('should be shown for comments by the logged in user only', () => {
      expect(editLink.length).toEqual(1);

      // Mount another component to verify a different user doesn't get the edit button
      const otherUser = MOCK_USERS[1];
      const secondComment = mount(
        <Comment
          {...defaultProps}
          conversationId={mockComment.conversationId}
          comment={mockComment}
          user={otherUser}
        />,
      );
      const secondCommentEditLink = secondComment
        .first()
        .find(CommentAction)
        // @TODO ED-3521 - Remove the hardcoded string and find by a unique identifier instead
        .findWhere(item => item.is(CommentAction) && item.text() === 'Edit')
        .first();

      expect(secondCommentEditLink.length).toEqual(0);

      secondComment.unmount();
    });

    describe.skip('when clicked', () => {
      let editor: ReactWrapper;

      beforeEach(() => {
        expect(comment.find(Editor).length).toBe(0);
        editLink.simulate('click');
        editor = comment.find(Editor);
      });

      it('should show an editor containing the comment text', () => {
        expect(editor.length).toBe(1);
        expect(editor.first().props()).toHaveProperty(
          'defaultValue',
          mockComment.document.adf,
        );
      });

      describe('and saved', () => {
        let newDoc: object;

        beforeEach(() => {
          newDoc = {
            ...mockComment.document.adf,
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'New content',
                  },
                ],
              },
            ],
          };

          const { onSave } = editor.first().props() as any;
          onSave(newDoc);
          comment.update();
        });

        it('should update the comment', () => {
          expect(onUpdateComment).toBeCalledWith(
            mockComment.conversationId,
            mockComment.commentId,
            newDoc,
          );
        });

        it('should hide the editor', () => {
          expect(comment.first().find(Editor).length).toBe(0);
        });
      });

      describe('and cancelled', () => {
        beforeEach(() => {
          const { onCancel } = editor.first().props() as any;
          onCancel();
          comment.update();
        });

        it('should not update the comment', () => {
          expect(onUpdateComment.mock.calls.length).toBe(0);
        });

        it('should hide the editor', () => {
          expect(comment.first().find(Editor).length).toBe(0);
        });
      });
    });
  });

  describe.skip('delete link', () => {
    let user;
    let deleteLink: ReactWrapper;
    let onDeleteComment: jest.Mock;

    beforeEach(() => {
      user = MOCK_USERS[0];

      onDeleteComment = jest.fn();

      comment = mount(
        <Comment
          {...defaultProps}
          conversationId={mockComment.conversationId}
          comment={mockComment}
          user={user}
          onDeleteComment={onDeleteComment}
        />,
      );

      deleteLink = comment
        .first()
        .find(CommentAction)
        // @TODO ED-3521 - Remove the hardcoded string and find by a unique identifier instead
        .findWhere((item: ReactWrapper) => item.text() === 'Delete')
        .first();
    });

    afterEach(() => {
      comment.unmount();
    });

    it('should be shown for comments by the logged in user only', () => {
      expect(deleteLink.length).toEqual(1);

      // Mount another component to verify a different user doesn't get the edit button
      const otherUser = MOCK_USERS[1];
      const secondComment = mount(
        <Comment
          {...defaultProps}
          conversationId={mockComment.conversationId}
          comment={mockComment}
          user={otherUser}
        />,
      );
      const secondCommentDeleteLink = secondComment
        .first()
        .find(CommentAction)
        // @TODO ED-3521 - Remove the hardcoded string and find by a unique identifier instead
        .findWhere(item => item.text() === 'Delete')
        .first();

      expect(secondCommentDeleteLink.length).toEqual(0);

      secondComment.unmount();
    });

    it('should delete the comment when clicked', () => {
      deleteLink.simulate('click');
      expect(onDeleteComment).toBeCalledWith(
        mockComment.conversationId,
        mockComment.commentId,
      );
    });
  });

  describe('username link', () => {
    let user: User;
    let usernameLink: ReactWrapper;
    let onUserClick: jest.Mock;

    beforeEach(() => {
      user = MOCK_USERS[0];

      onUserClick = jest.fn();

      comment = mount(
        <Comment
          {...defaultProps}
          conversationId={mockComment.conversationId}
          comment={mockComment}
          user={user}
          onUserClick={onUserClick}
        />,
      );

      usernameLink = comment
        .first()
        .find(CommentAuthor)
        .first();
    });

    afterEach(() => {
      comment.unmount();
    });

    it('should invoke the onUserClick with the clicked user if specified', () => {
      expect(onUserClick.mock.calls.length).toBe(0);
      usernameLink.simulate('click');
      expect(onUserClick).toHaveBeenCalledWith(user);
    });
  });

  describe('reactions', () => {
    const [user] = MOCK_USERS;

    it('should render reactions-component if dataProvider contains reactionsProvider and emojiProvider', () => {
      const comment = mount(
        <Comment
          {...defaultProps}
          conversationId={mockComment.conversationId}
          objectId="ari:cloud:platform::conversation/demo"
          comment={mockComment}
          dataProviders={getDataProviderFactory()}
          user={user}
        />,
      );

      expect(comment.first().find(ConnectedReactionsView).length).toEqual(1);
      comment.unmount();
    });

    it('should render reactions-component if dataProvider contains emojiProvider', () => {
      const comment = mount(
        <Comment
          {...defaultProps}
          conversationId={mockComment.conversationId}
          objectId="ari:cloud:platform::conversation/demo"
          comment={mockComment}
          dataProviders={getDataProviderFactory()}
          user={user}
        />,
      );

      expect(comment.first().find(ConnectedReactionsView).length).toEqual(1);
      comment.unmount();
    });

    it('should not render reactions-component if emojiProvider is missing', () => {
      const comment = mount(
        <Comment
          {...defaultProps}
          conversationId={mockComment.conversationId}
          objectId="ari:cloud:platform::conversation/demo"
          comment={mockComment}
          dataProviders={getDataProviderFactory(['mentionProvider'])}
          user={user}
        />,
      );

      expect(comment.first().find(ConnectedReactionsView).length).toEqual(0);

      comment.unmount();
    });

    it('should not render reactions-component if objectId is missing', () => {
      const comment = mount(
        <Comment
          {...defaultProps}
          conversationId={mockComment.conversationId}
          comment={mockComment}
          dataProviders={getDataProviderFactory()}
          user={user}
        />,
      );

      expect(comment.first().find(ConnectedReactionsView).length).toEqual(0);

      comment.unmount();
    });

    it('should not render reactions-component if commentAri is missing', () => {
      const comment = mount(
        <Comment
          {...defaultProps}
          conversationId={mockComment.conversationId}
          objectId="ari:cloud:platform::conversation/demo"
          comment={{
            ...mockComment,
            commentAri: undefined,
          }}
          dataProviders={getDataProviderFactory()}
          user={user}
        />,
      );

      expect(comment.first().find(ConnectedReactionsView).length).toEqual(0);

      comment.unmount();
    });

    it('should not render reactions-component if user is missing', () => {
      const comment = mount(
        <Comment
          {...defaultProps}
          conversationId={mockComment.conversationId}
          objectId="ari:cloud:platform::conversation/demo"
          comment={mockComment}
          dataProviders={getDataProviderFactory()}
        />,
      );

      expect(comment.first().find(ConnectedReactionsView).length).toEqual(0);

      comment.unmount();
    });
  });
});
