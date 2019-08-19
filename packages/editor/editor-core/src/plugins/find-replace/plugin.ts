import { PluginKey, Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { colors } from '@atlaskit/theme';
import { pluginFactory } from '../../utils/plugin-state-factory';
import reducer from './reducer';
import { Dispatch } from '../../event-dispatcher';
import { FindReplaceAction } from './actions';

export interface FindReplaceState {
  active: boolean;
  searchWord: string;
  replaceWord: string;
  index: number;
}

export interface FindReplaceInitialState {
  active: false;
  searchWord: '';
  replaceWord: '';
  index: 0;
}

export const findReplacePluginKey = new PluginKey('findReplace');

export const getInitialState = (): FindReplaceInitialState => ({
  active: false,
  searchWord: '',
  replaceWord: '',
  index: 0,
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
        if (pluginState.active && pluginState.searchWord) {
          // search document text for matches
          // todo: how to make this as performant as possible?

          return DecorationSet.create(state.doc, [
            Decoration.inline(state.selection.from, state.selection.to, {
              style: `background-color: ${colors.P75};`,
            }),
          ]);
        }
      },
    },
  });
