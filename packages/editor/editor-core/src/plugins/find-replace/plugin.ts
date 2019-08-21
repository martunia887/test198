import { PluginKey, Plugin, TextSelection } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { colors } from '@atlaskit/theme';
import { pluginFactory } from '../../utils/plugin-state-factory';
import reducer from './reducer';
import { Dispatch } from '../../event-dispatcher';
import { FindReplaceAction } from './actions';
import { Match } from './types';

export interface FindReplaceState {
  /** Whether find/replace is active, i.e. displayed */
  active: boolean;
  /** Whether we should set focus into and select all text of find textfield */
  shouldFocus: boolean;
  /** Search keyword */
  findText: string;
  /** Text to replace with */
  replaceText: string;
  /** Index of selected word in array of matches, this gets updated as user finds next/prev */
  index: number;
  /** Positions of find results */
  matches: Match[];
}

export interface FindReplaceInitialState {
  active: false;
  findText: '';
  replaceText: '';
  index: 0;
  matches: [];
}

export const findReplacePluginKey = new PluginKey('findReplace');

export const getInitialState = (): FindReplaceInitialState => ({
  active: false,
  shouldFocus: false,
  findText: '',
  replaceText: '',
  index: 0,
  matches: [],
});

export const {
  createCommand: createFindReplaceCommand,
  getPluginState: getFindReplacePluginState,
  createPluginState: createFindReplacePluginState,
} = pluginFactory<FindReplaceState, FindReplaceAction, FindReplaceInitialState>(
  findReplacePluginKey,
  reducer,
);

export const createPlugin = (dispatch: Dispatch) =>
  new Plugin({
    key: findReplacePluginKey,
    state: createFindReplacePluginState(dispatch, getInitialState()),
    props: {
      decorations(state) {
        const pluginState = getFindReplacePluginState(state);
        if (pluginState.active && pluginState.findText) {
          const selectedIndex = pluginState.index;
          return DecorationSet.create(
            state.doc,
            pluginState.matches.map(({ start, end }, index) =>
              Decoration.inline(start, end, {
                style: `background-color: ${
                  index === selectedIndex ? colors.B100 : colors.B75
                };`,
              }),
            ),
          );
        }
      },
    },
    appendTransaction(transactions, oldState, newState) {
      // todo: is this really the best performance wise?
      const pluginState = getFindReplacePluginState(newState);
      if (pluginState.matches) {
        const oldPluginState = getFindReplacePluginState(oldState);
        if (pluginState.index !== oldPluginState.index) {
          const selected = pluginState.matches[pluginState.index];
          if (selected) {
            return newState.tr.setSelection(
              TextSelection.create(newState.doc, selected.start, selected.end),
            );
          }
        }
      }
    },
  });
