//@flow
import React from 'react';
import { shallow } from 'enzyme';
import { mockConversation, MOCK_USERS } from '../../example-helpers/MockData';
import Conversation from '../../src/components/Conversation';
import Editor from '../../src/components/Editor';
import CommentContainer from '../../src/containers/Comment';

const containerId = 'ari:cloud:platform::conversation/demo';
const { comments } = (mockConversation: any);
const [user] = MOCK_USERS;

describe('Conversation', () => {
  const conversation = shallow(
    <Conversation
      containerId={containerId}
      conversation={mockConversation}
      comments={comments}
      user={user}
    />,
  );

  describe('comments', () => {
    it('should render comments if any', () => {
      expect(conversation.find(CommentContainer).length).toBe(comments.length);
    });
  });

  describe('editor', () => {
    it('should render if meta is not set', () => {
      expect(conversation.find(Editor).length).toBe(1);
    });

    it('should not render if meta is set', () => {
      const convo = shallow(
        <Conversation
          containerId={containerId}
          meta={{ test: 'testing' }}
          user={user}
        />,
      );
      expect(convo.find(Editor).length).toBe(0);
    });

    it('should render if isExpanded is true', () => {
      const convo = shallow(
        <Conversation
          containerId={containerId}
          meta={{ test: 'testing' }}
          isExpanded
          user={user}
        />,
      );
      expect(convo.find(Editor).length).toBe(1);
    });

    describe('no user', () => {
      it('should not render if meta is not set', () => {
        const convo = shallow(<Conversation containerId={containerId} />);
        expect(convo.find(Editor).length).toBe(0);
      });

      it('should not render if meta is set', () => {
        const convo = shallow(
          <Conversation containerId={containerId} meta={{ test: 'testing' }} />,
        );
        expect(convo.find(Editor).length).toBe(0);
      });

      it('should not render if isExpanded is true', () => {
        const convo = shallow(
          <Conversation
            containerId={containerId}
            meta={{ test: 'testing' }}
            isExpanded
          />,
        );
        expect(convo.find(Editor).length).toBe(0);
      });
    });
  });
});
