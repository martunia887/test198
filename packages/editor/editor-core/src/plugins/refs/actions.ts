import * as assert from 'assert';
import { REFS_ACTIONS, pluginKey } from './pm-plugins/main';
import { Command } from '../../types';
import { ReferenceProvider } from './provider';

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

export const setReferenceProvider = (
  provider: Promise<ReferenceProvider>,
) => async (state, dispatch): Promise<boolean> => {
  let resolvedProvider: ReferenceProvider | null;
  try {
    resolvedProvider = await provider;
    assert(
      resolvedProvider,
      `ReferenceProvider promise did not resolve to a valid instance of ReferenceProvider - ${resolvedProvider}`,
    );
  } catch (err) {
    resolvedProvider = null;
  }

  dispatch(
    state.tr
      .setMeta(pluginKey, {
        action: REFS_ACTIONS.SET_PROVIDER,
        data: {
          provider: resolvedProvider,
        },
      })
      .setMeta('addToHistory', false),
  );

  return true;
};
