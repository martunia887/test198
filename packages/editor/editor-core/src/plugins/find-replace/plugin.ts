import { PluginKey, Plugin, Transaction } from 'prosemirror-state';
import { DecorationSet, Decoration } from 'prosemirror-view';
import { pluginFactory } from '../../utils/plugin-state-factory';
import reducer from './reducer';
import { Dispatch } from '../../event-dispatcher';
import { FindReplaceAction } from './actions';
import { Match } from './types';
import {
  findMatches,
  createDecorations,
  nextIndex,
  removeDecorationsFromSet,
  findDecorationFromMatch,
  findSearchIndex,
} from './utils';
import { findUniqueItemsIn } from '../../utils/array';

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
    let { index, selectionPos, decorationSet, matches } = pluginState;
    const newMatches = findMatches(tr.doc, pluginState.findText);

    decorationSet = decorationSet.map(tr.mapping, tr.doc);
    matches = matches.map(match => ({
      start: tr.mapping.map(match.start),
      end: tr.mapping.map(match.end),
    }));

    const comparitor = (firstMatch: Match, secondMatch: Match) =>
      firstMatch.start === secondMatch.start;
    const matchesToDelete = findUniqueItemsIn<Match>(
      matches,
      newMatches,
      comparitor,
    );
    const matchesToAdd = findUniqueItemsIn<Match>(
      newMatches,
      matches,
      comparitor,
    );

    // update decorations if matches changed following document update
    if (matchesToDelete.length > 0) {
      const decorationsToDelete = matchesToDelete.reduce(
        (decorations: Decoration[], match) => [
          ...decorations,
          ...decorationSet.find(match.start, match.end),
        ],
        [],
      );
      decorationSet = removeDecorationsFromSet(
        decorationSet,
        decorationsToDelete,
        tr.doc,
      );
    }
    if (matchesToAdd.length > 0) {
      decorationSet = decorationSet.add(
        tr.doc,
        createDecorations(selectionPos, matchesToAdd),
      );
    }

    // update selected match if it has changed
    const selectedMatch = matches[index];
    let newIndex = newMatches.findIndex(
      match => match.start === selectedMatch.start,
    );
    if (newIndex === undefined || newIndex === -1) {
      newIndex = findSearchIndex(tr.selection.from, newMatches);
    }
    const newSelectedMatch = newMatches[newIndex];

    if (selectedMatch.start !== newSelectedMatch.start) {
      const decorationToRemove = findDecorationFromMatch(
        decorationSet,
        selectedMatch,
      );
      if (decorationToRemove) {
        decorationSet = removeDecorationsFromSet(
          decorationSet,
          [decorationToRemove],
          tr.doc,
        );
      }
      decorationSet = decorationSet.add(
        tr.doc,
        createDecorations(0, [newSelectedMatch]),
      );
    }

    return {
      ...pluginState,
      matches: newMatches,
      index: newIndex,
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
