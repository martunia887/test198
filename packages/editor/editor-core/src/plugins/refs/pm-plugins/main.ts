import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { Dispatch } from '../../../event-dispatcher';
import { handleToggleReference } from '../action-handlers';

export const pluginKey = new PluginKey('refsPlugin');

export interface RefsPluginState {
  showReferenceMenu: boolean;
  nodePosition?: number;
}

export enum REFS_ACTIONS {
  TOGGLE_REFERENCE_MENU,
}

export const createPlugin = (dispatch: Dispatch) =>
  new Plugin({
    state: {
      init: (): RefsPluginState => {
        return {
          showReferenceMenu: false,
        };
      },
      apply(tr: Transaction, _pluginState: RefsPluginState) {
        const meta = tr.getMeta(pluginKey) || {};
        const data = meta.data || {};
        const { nodePosition } = data;

        let pluginState = { ..._pluginState };

        if (tr.docChanged && pluginState.nodePosition) {
          const { pos, deleted } = tr.mapping.mapResult(
            pluginState.nodePosition,
          );
          pluginState = {
            ...pluginState,
            nodePosition: deleted ? undefined : pos,
          };
        }

        switch (meta.action) {
          case REFS_ACTIONS.TOGGLE_REFERENCE_MENU:
            return handleToggleReference(nodePosition, pluginState, dispatch);

          default:
            break;
        }

        return pluginState;
      },
    },
    key: pluginKey,
  });

export const getPluginState = (state: EditorState) => {
  return pluginKey.getState(state);
};
