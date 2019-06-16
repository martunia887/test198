import {
  EditorState,
  StateField,
  PluginKey,
  Transaction,
} from 'prosemirror-state';
import { Command } from './types';
import { pluginKey as storeKey, Action as StoreAction } from './plugin';
/**
 * Creates a ProseMirror plugin's state and handles UI updates.
 *
 * Here's a few things to keep in mind:
 * - plugin's state is stored as a single object
 * - `Reducer` specifies how plugin's state changes in response to commands
 * - `Command` describes only what happen, but not how state changes
 * - `mapping` could be used to map ProseMirror positions stored in plugin's state
 *
 * Example:
 *  const { createPluginState, createCommand, getPluginState } = pluginFactory(
 *    reducer,
 *    pluginKey
 *  );
 *
 *  export const createPlugin = (dispatch: Dispatch, initialState) =>
 *    new Plugin({
 *      state: createPluginState(dispatch, initialState),
 *      key: pluginKey
 *    });
 *
 * Example of a reducer:
 *
 *  export const reducer = (
 *    state: TablePluginState,
 *    action: TableAction,
 *  ): TablePluginState => {
 *    switch (action.type) {
 *      case 'TOGGLE_CONTEXTUAL_MENU':
 *      return {
 *        ...state,
 *        isContextualMenuOpen: !state.isContextualMenuOpen,
 *      };
 *    default:
 *      return state;
 *    }
 *  };
 *
 *
 * Example of a command:
 *
 * export const toggleContextualMenu = createCommand({
 *   type: 'TOGGLE_CONTEXTUAL_MENU',
 * }, tr => tr.setMeta('addToHistory', false));
 *
 */

function isFunction(x: any): x is Function {
  return typeof x === 'function';
}

type MetaActions = Array<StoreAction> | undefined;

export type Reducer<PluginState, Action> = (
  state: PluginState,
  action: Action,
) => PluginState;

export type MapState<PluginState> = (
  tr: Transaction,
  pluginState: PluginState,
) => PluginState;

export function pluginFactory<
  PluginState,
  Action extends StoreAction,
  InitialState extends PluginState
>(
  pluginKey: PluginKey,
  reducer: Reducer<PluginState, Action>,
  options: {
    mapping?: MapState<PluginState>;
    onDocChanged?: MapState<PluginState>;
    onSelectionChanged?: MapState<PluginState>;
  } = {},
): {
  createPluginState: (initialState: InitialState) => StateField<PluginState>;
  createCommand: (
    action: Action | ((state: Readonly<EditorState>) => Action | false),
    transform?: (tr: Transaction, state: EditorState) => Transaction,
  ) => Command;
  getPluginState: (state: EditorState) => PluginState;
} {
  const { mapping, onDocChanged, onSelectionChanged } = options;

  return {
    createPluginState: initialState => ({
      init: () => initialState,

      apply(tr, _pluginState) {
        const oldState = mapping ? mapping(tr, _pluginState) : _pluginState;
        let newState = oldState;

        const meta: MetaActions = tr.getMeta(storeKey);
        if (meta) {
          for (let action of meta) {
            newState = reducer(newState, action as Action);
          }
        }

        if (onDocChanged && tr.docChanged) {
          newState = onDocChanged(tr, newState);
        } else if (onSelectionChanged && tr.selectionSet) {
          newState = onSelectionChanged(tr, newState);
        }

        return newState;
      },
    }),

    createCommand: (action, transform) => (state, dispatch) => {
      if (dispatch) {
        const tr = transform ? transform(state.tr, state) : state.tr;
        const resolvedAction = isFunction(action) ? action(state) : action;
        if (tr && resolvedAction) {
          const actions = tr.getMeta(storeKey) || [];
          actions.push(resolvedAction);
          dispatch(tr);
        } else {
          return false;
        }
      }
      return true;
    },

    getPluginState: state => pluginKey.getState(state),
  };
}
