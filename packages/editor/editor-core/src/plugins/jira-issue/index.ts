import { confluenceJiraIssue } from '@atlaskit/adf-schema';
import { Plugin, PluginKey } from 'prosemirror-state';

import { ReactNodeView } from '../../nodeviews';
import { EditorPlugin, PMPluginFactory } from '../../types';

import ReactJIRAIssueNode from './nodeviews/jira-issue';

export const pluginKey = new PluginKey('jiraIssuePlugin');

const createPlugin: PMPluginFactory = ({ portalProviderAPI }) => {
  return new Plugin({
    key: pluginKey,
    props: {
      nodeViews: {
        confluenceJiraIssue: ReactNodeView.fromComponent(
          ReactJIRAIssueNode,
          portalProviderAPI,
        ),
      },
    },
  });
};

const jiraIssuePlugin = (): EditorPlugin => ({
  name: 'confluenceJiraIssue',

  nodes() {
    return [{ name: 'confluenceJiraIssue', node: confluenceJiraIssue }];
  },

  pmPlugins() {
    return [
      {
        name: 'jiraIssue',
        plugin: createPlugin,
      },
    ];
  },
});

export default jiraIssuePlugin;
