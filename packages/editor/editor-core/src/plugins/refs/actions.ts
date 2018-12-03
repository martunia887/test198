import { REFS_ACTIONS, pluginKey } from './pm-plugins/main';
import { Command } from '../../types';

export const toggleRefsMenu = (nodePosition?: number): Command => (
  state,
  dispatch,
) => {
  dispatch(
    state.tr
      .setMeta(pluginKey, {
        action: REFS_ACTIONS.TOGGLE_REFERENCE_MENU,
        data: {
          nodePosition,
        },
      })
      .setMeta('addToHistory', false),
  );
  return true;
};
