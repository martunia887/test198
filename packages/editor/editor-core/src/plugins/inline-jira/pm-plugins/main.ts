import { Plugin, PluginKey, Transaction, EditorState } from 'prosemirror-state';

export const pluginKey = new PluginKey('inlineJiraPlugin');

const createPlugin = () =>
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
      nodeViews: {},
    },
  });

export default createPlugin;
