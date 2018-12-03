import { REFS_ACTIONS, pluginKey } from './pm-plugins/main';
import { Command } from '../../types';

export const updateTitleTarget = (
  titleMenuTarget?: HTMLElement,
  nodePosition?: number,
): Command => (state, dispatch) => {
  dispatch(
    state.tr
      .setMeta(pluginKey, {
        action: REFS_ACTIONS.UPDATE_TITLE_TARGET,
        data: {
          titleMenuTarget,
          nodePosition,
        },
      })
      .setMeta('addToHistory', false),
  );
  return true;
};
