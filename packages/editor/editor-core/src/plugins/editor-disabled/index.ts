import { Plugin, PluginKey, Transaction, EditorState } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
import { Dispatch } from '../../event-dispatcher';

export const pluginKey = new PluginKey('editorDisabledPlugin');

export type EditorDisabledPluginState = {
  editorDisabled?: boolean;
};

/*
Stores the state of the editor enabled/disabled for panel and floating
toolbar to subscribe to through <WithPluginState>. Otherwise the NodeViews
won't re-render when it changes.
*/
export function createPlugin(
  dispatch: Dispatch<EditorDisabledPluginState>,
): Plugin | undefined {
  return new Plugin({
    key: pluginKey,
    filterTransaction: (t: Transaction, s: EditorState) => {
      console.log('Transaction:', t);
      console.log('Filter transaction called!');
      const newPluginState: EditorDisabledPluginState = t.getMeta(pluginKey);
      if (newPluginState && newPluginState.editorDisabled === false) {
        return false;
      }
      return true;
    },
    state: {
      init: () =>
        ({
          editorDisabled: undefined,
        } as EditorDisabledPluginState),
      apply(tr, oldPluginState: EditorDisabledPluginState) {
        const newPluginState: EditorDisabledPluginState = tr.getMeta(pluginKey);

        if (
          newPluginState &&
          oldPluginState.editorDisabled !== newPluginState.editorDisabled
        ) {
          dispatch(pluginKey, newPluginState);
          return newPluginState;
        }
        return oldPluginState;
      },
    },
  });
}

const editorDisabledPlugin: EditorPlugin = {
  pmPlugins: () => [
    {
      name: 'editorDisabled',
      plugin: ({ dispatch }) => createPlugin(dispatch),
    },
  ],
};

export default editorDisabledPlugin;
