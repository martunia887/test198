import { Plugin, PluginKey, Transaction, EditorState } from 'prosemirror-state';
import InlineJiraView from '../nodeviews';

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
      },
    },
  });

export default createPlugin;
