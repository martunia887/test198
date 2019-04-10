import assert from 'assert';
import { EditorState } from 'prosemirror-state';
import { uuid } from '@atlaskit/adf-schema';
import { findTable } from 'prosemirror-utils';

import { REFS_ACTIONS, pluginKey, getPluginState } from './pm-plugins/main';
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

export const linkTable: Command = (state, dispatch) => {
  const { tr } = state;
  const { node, pos } = findTable(state.selection)!;

  tr.setNodeMarkup(pos, state.schema.nodes.table, {
    ...node.attrs,
    id: uuid.generate(),
  });

  if (dispatch) {
    const pluginState = getPluginState(state);
    if (pluginState.provider) {
      const { node: newTable } = findTable(tr.selection)!;
      pluginState.provider.addTable(newTable);
    }
    dispatch(tr);
  }

  return true;
};
