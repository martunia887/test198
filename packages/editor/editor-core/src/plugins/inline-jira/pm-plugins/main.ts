import { Plugin, PluginKey, Transaction, EditorState } from 'prosemirror-state';
import { DecorationSet } from 'prosemirror-view';
import { ReactNodeView } from '../../../nodeviews';
import InlineJiraView from '../nodeviews';
import jiraIssueNodeView from '../nodeviews/jiraIssue';

export const pluginKey = new PluginKey('inlineJiraPlugin');

const createPlugin = portalProviderAPI =>
  new Plugin({
    key: pluginKey,
    state: {
      init: () => {
        return {};
      },
      apply: (tr: Transaction, pluginState, _, state: EditorState) => {
        return pluginState;
      },
    },

    props: {
      nodeViews: {
        jiraQuery: (node, view, getPos) =>
          new InlineJiraView(node, view, getPos, portalProviderAPI, {}).init(),
        jiraIssue: ReactNodeView.fromComponent(
          jiraIssueNodeView,
          portalProviderAPI,
        ),
      },
    },
  });

export default createPlugin;
