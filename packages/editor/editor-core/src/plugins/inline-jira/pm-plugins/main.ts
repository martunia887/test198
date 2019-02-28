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
        return { decorations: null };
      },
      apply: (tr: Transaction, pluginState, _, state: EditorState) => {
        const meta = tr.getMeta(pluginKey);
        if (meta) {
          return {
            decorations: meta.decorations,
          };
        }
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

      decorations: editorState => {
        const state = pluginKey.getState(editorState);
        if (!state) {
          return null;
        }

        if (!state.decorations) {
          return null;
        }

        console.log('returning decos', state.decorations);

        return DecorationSet.create(editorState.doc, [state.decorations]);
      },
    },
  });

export default createPlugin;
