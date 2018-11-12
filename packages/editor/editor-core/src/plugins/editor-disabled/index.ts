import { Plugin, PluginKey, Transaction, EditorState } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
import { Dispatch } from '../../event-dispatcher';

export const pluginKey = new PluginKey('editorDisabledPlugin');

export type EditorDisabledPluginState = {
  editorDisabled?: boolean;
  // lastEditorDisabled?: boolean;
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
      const newPluginState: EditorDisabledPluginState = t.getMeta(pluginKey);
      // if(!newPluginState) {
      // console.log('Transaction allowed, plugin don"t exist:');
      // console.log({ newPluginState, t,s });
      //   return true
      // }
      return false;
      // @ts-ignore
      if (s && s.editorDisabledPlugin$) {
        // @ts-ignore
        const { editorDisabled } = s.editorDisabledPlugin$;
        console.log('editorDisabled in filter:', editorDisabled);
        console.log('newPluginState in filter:', newPluginState);
        // console.log({ newPluginState, t,s });
        // return !editorDisabled;
      }
      // const {editorDisabled} = newPluginState;
      // if (editorDisabled === true) {
      //   console.log('Transaction rejected:', t);
      //   return false;
      // }
      // console.log('Transaction allowed by default:');
      // console.log({ newPluginState, t,s });
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
          // if (newPluginState.editorDisabled === true) {
          //   console.log('Dispatching newPluginState to be disabled');
          //   debugger;
          // }

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
