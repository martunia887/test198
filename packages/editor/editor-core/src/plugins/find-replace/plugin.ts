import { Plugin, Transaction } from 'prosemirror-state';
import { DecorationSet, Decoration } from 'prosemirror-view';
import { pluginFactory } from '../../utils/plugin-state-factory';
import reducer from './reducer';
import { Dispatch } from '../../event-dispatcher';
import { FindReplaceAction } from './actions';
import { Match, FindReplacePluginState, findReplacePluginKey } from './types';
import {
  findMatches,
  createDecorations,
  removeDecorationsFromSet,
  findDecorationFromMatch,
  findSearchIndex,
} from './utils';
import { findUniqueItemsIn } from '../../utils/array';

export const getInitialState = (): FindReplacePluginState => ({
  isActive: false,
  shouldFocus: false,
  findText: '',
  replaceText: '',
  index: 0,
  matches: [],
  decorationSet: DecorationSet.empty,
});

const handleDocChanged = (
  tr: Transaction,
  pluginState: FindReplacePluginState,
): FindReplacePluginState => {
  const { isActive, findText } = pluginState;
  if (isActive && findText) {
    let { index, decorationSet, matches } = pluginState;
    const newMatches = findMatches(tr.doc, findText);

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
        createDecorations(tr.selection.from, matchesToAdd),
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

    if (
      selectedMatch &&
      newSelectedMatch &&
      selectedMatch.start !== newSelectedMatch.start
    ) {
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
  createCommand,
  getPluginState,
  createPluginState,
} = pluginFactory<
  FindReplacePluginState,
  FindReplaceAction,
  FindReplacePluginState
>(findReplacePluginKey, reducer, { onDocChanged: handleDocChanged });

export const createPlugin = (dispatch: Dispatch) =>
  new Plugin({
    key: findReplacePluginKey,
    state: createPluginState(dispatch, getInitialState()),
    props: {
      decorations(state) {
        const { isActive, findText, decorationSet } = getPluginState(state);
        if (isActive && findText) {
          return decorationSet;
        }
      },
    },
  });
