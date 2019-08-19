import { pluginFactory } from '../../utils/plugin-state-factory';
import { PluginKey, Plugin } from 'prosemirror-state';
import reducer from './reducer';
import { Dispatch } from '../../event-dispatcher';
import { FindReplaceAction } from './actions';
import keymapPlugin from './keymap';
import { EditorPlugin } from 'src/types';

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

// todo: add something to remap positions?
const findReplacePluginStateFactory = pluginFactory<
  FindReplaceState,
  FindReplaceAction,
  FindReplaceInitialState
>(findReplacePluginKey, reducer);

export const {
  createCommand: createFindReplaceCommand,
} = findReplacePluginStateFactory;

export const createPlugin = (dispatch: Dispatch) =>
  new Plugin({
    state: findReplacePluginStateFactory.createPluginState(
      dispatch,
      getInitialState(),
    ),
    key: findReplacePluginKey,
  });

// todo: any options needed?
export const findReplacePlugin = (): EditorPlugin => ({
  pmPlugins() {
    return [
      { name: 'findReplace', plugin: ({ dispatch }) => createPlugin(dispatch) },
      {
        name: 'findReplaceKeymap',
        plugin: () => keymapPlugin(),
      },
    ];
  },
});
export default findReplacePlugin;
