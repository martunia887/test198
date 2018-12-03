import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { Dispatch } from '../../../event-dispatcher';
import { handleUpdateTitleTarget } from '../action-handlers';

export const pluginKey = new PluginKey('refsPlugin');

export interface RefsPluginState {
  nodePosition?: number;
  titleMenuTarget?: HTMLElement;
}

export enum REFS_ACTIONS {
  UPDATE_TITLE_TARGET,
}

export const createPlugin = (dispatch: Dispatch) =>
  new Plugin({
    state: {
      init: (): RefsPluginState => {
        return {};
      },
      apply(tr: Transaction, _pluginState: RefsPluginState) {
        const meta = tr.getMeta(pluginKey) || {};
        const data = meta.data || {};
        const { nodePosition, titleMenuTarget } = data;

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
          case REFS_ACTIONS.UPDATE_TITLE_TARGET:
            return handleUpdateTitleTarget(nodePosition, titleMenuTarget)(
              pluginState,
              dispatch,
            );

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
