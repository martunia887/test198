import { Plugin, PluginKey, Transaction, EditorState } from 'prosemirror-state';
import { ReactNodeView } from '../../../nodeviews';
import JiraCreateNode from '../nodeviews';

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
        jira: ReactNodeView.fromComponent(JiraCreateNode, portalProviderAPI),
      },
    },
  });

export default createPlugin;
