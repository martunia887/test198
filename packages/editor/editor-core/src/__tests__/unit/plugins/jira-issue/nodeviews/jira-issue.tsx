import * as React from 'react';
import { mount } from 'enzyme';
import {
  confluenceJiraIssue,
  defaultSchema,
} from '@atlaskit/editor-test-helpers';
import { JiraIcon } from '@atlaskit/logo';

import ReactJIRAIssueNode from '../../../../../plugins/jira-issue/nodeviews/jira-issue';

describe('jiraIssue - React component', () => {
  it('should return a node of type span', () => {
    const node = confluenceJiraIssue({ issueKey: 'test' })()(defaultSchema);
    const wrapper = mount(<ReactJIRAIssueNode node={node} />);
    expect(wrapper.getDOMNode().tagName).toEqual('SPAN');
    wrapper.unmount();
  });

  it('should use JiraLogo component', () => {
    const node = confluenceJiraIssue({ issueKey: 'test' })()(defaultSchema);
    const wrapper = mount(<ReactJIRAIssueNode node={node} />);
    expect(wrapper.find(JiraIcon).length).toBe(1);
    wrapper.unmount();
  });
});
