import { PluginKey, Plugin, Transaction } from 'prosemirror-state';
import { DecorationSet } from 'prosemirror-view';
import { pluginFactory } from '../../utils/plugin-state-factory';
import reducer from './reducer';
import { Dispatch } from '../../event-dispatcher';
import { FindReplaceAction } from './actions';
import { Match } from './types';
import { findMatches, findSearchIndex } from './utils';

export interface FindReplaceState {
  /** Whether find/replace is isActive, i.e. displayed */
  isActive: boolean;
  /** Whether we should set focus into and select all text of find textfield */
  shouldFocus: boolean;
  /** Search keyword */
  findText: string;
  /** Text to replace with */
  replaceText: string;
  /** User's selection.from position in editor */
  selectionPos: number;
  /** Index of selected word in array of matches, this gets updated as user finds next/prev */
  index: number;
  /** Positions of find results */
  matches: Match[];
  /** Decorations for the search match highlights */
  decorationSet: DecorationSet;
}

export const findReplacePluginKey = new PluginKey('findReplace');

export const getInitialState = (): FindReplaceState => ({
  isActive: false,
  shouldFocus: false,
  findText: '',
  replaceText: '',
  index: 0,
  selectionPos: 1,
  matches: [],
  decorationSet: DecorationSet.empty,
});

const handleDocChanged = (
  tr: Transaction,
  pluginState: FindReplaceState,
): FindReplaceState => {
  if (pluginState.isActive && pluginState.findText) {
    const matches = findMatches(tr.doc, pluginState.findText);
    let { index, selectionPos, decorationSet } = pluginState;

    // recalculate selected match index if matches have changed
    // todo: delete from decorations
    if (matches.length !== pluginState.matches.length) {
      if (pluginState.matches[index]) {
        const selectedStart = tr.mapping.map(pluginState.matches[index].start);
        index = matches.findIndex(match => match.start === selectedStart);
      }

      if (index === undefined || index === -1) {
        index = findSearchIndex(selectionPos, matches);
      }
    }

    decorationSet = decorationSet.map(tr.mapping, tr.doc);

    return {
      ...pluginState,
      matches,
      index,
      decorationSet,
    };
  }
  return pluginState;
};

export const {
  createCommand: createFindReplaceCommand,
  getPluginState: getFindReplacePluginState,
  createPluginState: createFindReplacePluginState,
} = pluginFactory<FindReplaceState, FindReplaceAction, FindReplaceState>(
  findReplacePluginKey,
  reducer,
  { onDocChanged: handleDocChanged },
);

export const createPlugin = (dispatch: Dispatch) =>
  new Plugin({
    key: findReplacePluginKey,
    state: createFindReplacePluginState(dispatch, getInitialState()),
    props: {
      decorations(state) {
        const { isActive, findText, decorationSet } = getFindReplacePluginState(
          state,
        );
        if (isActive && findText) {
          return decorationSet;
        }
      },
    },
  });
