import { Plugin, PluginKey, EditorState } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
import { Dispatch } from '../../event-dispatcher';

export const pluginKey = new PluginKey('editorDisabledPlugin');

export type EditorDisabledPluginState = {
  editorDisabled: boolean;
};

/*
Stores the state of the editor enabled/disabled for panel and floating
toolbar to subscribe to through <WithPluginState>. Otherwise the NodeViews
won't re-render when it changes.
*/
export function createPlugin(
  dispatch: Dispatch<EditorDisabledPluginState>,
  oldState?: EditorState,
): Plugin | undefined {
  return new Plugin({
    key: pluginKey,
    state: {
      init: (): EditorDisabledPluginState =>
        (oldState && pluginKey.getState(oldState)) || {
          editorDisabled: false,
        },
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
      plugin: ({ dispatch, oldState }) => createPlugin(dispatch, oldState),
    },
  ],
};

export default editorDisabledPlugin;
