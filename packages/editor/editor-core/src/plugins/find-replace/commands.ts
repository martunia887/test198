import { EditorState, TextSelection } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { createCommand, getPluginState } from './plugin';
import { FindReplaceActionTypes } from './actions';
import { Match } from './types';
import {
  findMatches,
  findSearchIndex,
  getSelectedText,
  createDecoration,
  nextIndex,
  prevIndex,
  findDecorationFromMatch,
  removeDecorationsFromSet,
} from './utils';
import { withScrollIntoView } from '../../utils/commands';

export const activate = () =>
  createCommand((state: EditorState) => {
    const { selection } = state;
    let findText: string | undefined;
    let matches: Match[] | undefined;
    let index: number | undefined;

    // if user has selected text and hit cmd-f, set that as the keyword
    if (selection instanceof TextSelection && !selection.empty) {
      findText = getSelectedText(selection);
      matches = findMatches(state.doc, findText);
      index = findSearchIndex(selection.from, matches);
    }

    return {
      type: FindReplaceActionTypes.ACTIVATE,
      findText,
      matches,
      index,
    };
  });

export const find = (keyword?: string) =>
  withScrollIntoView(
    createCommand(
      (state: EditorState) => {
        const { selection } = state;
        const matches = keyword ? findMatches(state.doc, keyword) : [];
        const index = findSearchIndex(selection.from, matches);

        return {
          type: FindReplaceActionTypes.FIND,
          findText: keyword || '',
          matches,
          index,
        };
      },
      (tr, state) => {
        const { selection } = state;
        const matches = keyword ? findMatches(state.doc, keyword) : [];
        if (matches.length > 0) {
          const index = findSearchIndex(selection.from, matches);
          return tr.setSelection(
            TextSelection.create(state.doc, matches[index].start),
          );
        }
        return tr;
      },
    ),
  );

export const findNext = () =>
  withScrollIntoView(
    createCommand(
      (state: EditorState) => {
        let { decorationSet, index, matches } = getPluginState(state);
        decorationSet = updateSelectedHighlight(
          state,
          nextIndex(index, matches.length),
        );

        return { type: FindReplaceActionTypes.FIND_NEXT, decorationSet };
      },
      (tr, state) => {
        const { matches, index } = getPluginState(state);
        return tr.setSelection(
          TextSelection.create(
            state.doc,
            matches[nextIndex(index, matches.length)].start,
          ),
        );
      },
    ),
  );

export const findPrev = () =>
  withScrollIntoView(
    createCommand(
      (state: EditorState) => {
        let { decorationSet, index, matches } = getPluginState(state);
        decorationSet = updateSelectedHighlight(
          state,
          prevIndex(index, matches.length),
        );

        return { type: FindReplaceActionTypes.FIND_PREV, decorationSet };
      },
      (tr, state) => {
        const { matches, index } = getPluginState(state);
        return tr.setSelection(
          TextSelection.create(
            state.doc,
            matches[prevIndex(index, matches.length)].start,
          ),
        );
      },
    ),
  );

export const replace = (replaceText: string) =>
  withScrollIntoView(
    createCommand(
      {
        type: FindReplaceActionTypes.REPLACE,
        replaceText,
      },
      (tr, state) => {
        const { matches, index } = getPluginState(state);
        if (matches[index]) {
          const { start, end } = matches[index];
          tr.insertText(replaceText, start, end).setSelection(
            TextSelection.create(
              state.doc,
              // todo: move this to util
              matches[(index + 1) % matches.length].start,
            ),
          );
        }
        return tr;
      },
    ),
  );

export const replaceAll = (replaceText: string) =>
  createCommand(
    {
      type: FindReplaceActionTypes.REPLACE_ALL,
      replaceText: replaceText,
    },
    (tr, state) => {
      const pluginState = getPluginState(state);
      pluginState.matches.forEach(match => {
        tr.insertText(
          replaceText,
          tr.mapping.map(match.start),
          tr.mapping.map(match.end),
        );
      });
      return tr;
    },
  );

export const addDecorations = (decorations: Decoration[]) =>
  createCommand((state: EditorState) => {
    const { decorationSet } = getPluginState(state);
    return {
      type: FindReplaceActionTypes.UPDATE_DECORATIONS,
      decorationSet: decorationSet.add(state.doc, decorations),
    };
  });

export const removeDecorations = (decorations: Decoration[]) =>
  createCommand((state: EditorState) => {
    const { decorationSet } = getPluginState(state);
    return {
      type: FindReplaceActionTypes.UPDATE_DECORATIONS,
      decorationSet: removeDecorationsFromSet(
        decorationSet,
        decorations,
        state.doc,
      ),
    };
  });

export const cancelSearch = () =>
  createCommand({
    type: FindReplaceActionTypes.CANCEL,
  });

export const unfocus = () =>
  createCommand({
    type: FindReplaceActionTypes.UNFOCUS,
  });

const updateSelectedHighlight = (
  state: EditorState,
  nextSelectedIndex: number,
): DecorationSet => {
  let { decorationSet, index, matches } = getPluginState(state);
  const currentSelectedMatch = matches[index];
  const nextSelectedMatch = matches[nextSelectedIndex];
  const currentSelectedDecoration = findDecorationFromMatch(
    decorationSet,
    currentSelectedMatch,
  );
  const nextSelectedDecoration = findDecorationFromMatch(
    decorationSet,
    nextSelectedMatch,
  );

  // Update decorations so the current selected match becomes a normal match
  // and the next selected gets the selected styling
  if (currentSelectedDecoration && nextSelectedDecoration) {
    removeDecorationsFromSet(
      decorationSet,
      [currentSelectedDecoration, nextSelectedDecoration],
      state.doc,
    );
  }
  decorationSet = decorationSet.add(state.doc, [
    createDecoration(currentSelectedMatch.start, currentSelectedMatch.end),
    createDecoration(nextSelectedMatch.start, nextSelectedMatch.end, true),
  ]);

  return decorationSet;
};
