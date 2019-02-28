import { Plugin, PluginKey, Transaction, EditorState } from 'prosemirror-state';
import { ReactNodeView } from '../../../nodeviews';
import JiraCreateNode from '../nodeviews';
import { jiraQuery } from '@atlaskit/adf-schema';

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
        jiraQuery: (node, view, getPos) => {
          console.warn('hello');
          debugger;
          return ReactNodeView.fromComponent(JiraCreateNode, portalProviderAPI)(
            node,
            view,
            getPos,
          );
        },
      },
    },
  });

export default createPlugin;
