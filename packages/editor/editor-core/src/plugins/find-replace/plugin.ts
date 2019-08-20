import { PluginKey, Plugin } from 'prosemirror-state';
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
  findText: string;
  replaceWord: string;
  index: number;
  matches: Match[];
}

export interface FindReplaceInitialState {
  active: false;
  findText: '';
  replaceWord: '';
  index: 0;
  matches: [];
}

export const findReplacePluginKey = new PluginKey('findReplace');

export const getInitialState = (): FindReplaceInitialState => ({
  active: false,
  findText: '',
  replaceWord: '',
  index: 0,
  matches: [],
});

// todo: will we need to remap positions?
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
          // search document text for matches
          // todo: how to make this as performant as possible?
          return DecorationSet.create(
            state.doc,
            pluginState.matches.map(({ start, end }) =>
              Decoration.inline(start, end, {
                style: `background-color: ${colors.P75};`,
              }),
            ),
          );
        }
      },
    },
  });
