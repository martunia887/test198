import assert from 'assert';
import { EditorState } from 'prosemirror-state';
import { REFS_ACTIONS, pluginKey } from './pm-plugins/main';
import { Command, CommandDispatch } from '../../types';
import { ReferenceProvider } from './provider';

export const updateTitleTarget = (
  titleMenuTarget?: HTMLElement,
  nodePosition?: number,
): Command => (state, dispatch) => {
  if (dispatch) {
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
  }
  return false;
};

export const setReferenceProvider = (
  provider: Promise<ReferenceProvider>,
) => async (
  state: EditorState,
  dispatch: CommandDispatch,
): Promise<boolean> => {
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
