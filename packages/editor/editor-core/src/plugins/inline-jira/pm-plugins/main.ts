import { Plugin, PluginKey } from 'prosemirror-state';
import { ReactNodeView } from '../../../nodeviews';
import InlineJiraView from '../nodeviews';
import jiraIssueNodeView from '../nodeviews/jiraIssue';
import JiraIssueSelectNodeView from '../nodeviews/JiraIssueSelect';

export const pluginKey = new PluginKey('inlineJiraPlugin');

const createPlugin = portalProviderAPI =>
  new Plugin({
    key: pluginKey,
    state: {
      init: () => {
        return {};
      },
      apply: (tr, pluginState) => {
        return pluginState;
      },
    },

    props: {
      nodeViews: {
        jiraQuery: (node, view, getPos) =>
          new InlineJiraView(node, view, getPos, portalProviderAPI).init(),
        jiraIssue: ReactNodeView.fromComponent(
          jiraIssueNodeView,
          portalProviderAPI,
        ),
        // jiraIssueSelect: ReactNodeView.fromComponent(
        //   JiraIssueSelectNodeView,
        //   portalProviderAPI,
        // ),
      },
    },
  });

export default createPlugin;
