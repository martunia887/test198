import {
  EditorState,
  TextSelection,
  Selection,
  Transaction,
} from 'prosemirror-state';
import { Decoration } from 'prosemirror-view';
import { createFindReplaceCommand, getFindReplacePluginState } from './plugin';
import { FindReplaceActionTypes } from './actions';
import { Match } from './types';
import { findMatches, findSearchIndex, getSelectedText } from './utils';
import { withScrollIntoView } from '../../utils/commands';

export const activate = () =>
  createFindReplaceCommand(
    (state: EditorState) => {
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
        selectionPos: selection.from,
      };
    },
    (tr: Transaction) => tr.setSelection(Selection.atStart(tr.doc)),
  );

export const find = (keyword?: string) =>
  withScrollIntoView(
    createFindReplaceCommand(
      (state: EditorState) => {
        const { selectionPos } = getFindReplacePluginState(state);

        const matches = keyword ? findMatches(state.doc, keyword) : [];
        const index = findSearchIndex(selectionPos, matches);

        return {
          type: FindReplaceActionTypes.FIND,
          findText: keyword || '',
          matches,
          index,
          selectionPos: matches[index] ? matches[index].start : 1,
        };
      },
      (tr, state) => {
        const { selectionPos } = getFindReplacePluginState(state);
        const matches = keyword ? findMatches(state.doc, keyword) : [];
        if (matches.length > 0) {
          const index = findSearchIndex(selectionPos, matches);
          return tr.setSelection(
            TextSelection.create(state.doc, matches[index].start),
          );
        }
        return tr;
      },
    ),
  );

export const addDecorations = (decorations: Decoration[]) =>
  createFindReplaceCommand((state: EditorState) => {
    const { decorationSet } = getFindReplacePluginState(state);
    return {
      type: FindReplaceActionTypes.UPDATE_DECORATIONS,
      decorationSet: decorationSet.add(state.doc, decorations),
    };
  });

export const removeDecorations = (decorations: Decoration[]) =>
  createFindReplaceCommand((state: EditorState) => {
    const { decorationSet } = getFindReplacePluginState(state);
    return {
      type: FindReplaceActionTypes.UPDATE_DECORATIONS,
      decorationSet: decorationSet.remove(decorations),
    };
  });

export const findNext = () =>
  withScrollIntoView(
    createFindReplaceCommand(
      { type: FindReplaceActionTypes.FIND_NEXT },
      (tr, state) => {
        const { matches, index } = getFindReplacePluginState(state);
        return tr.setSelection(
          TextSelection.create(
            state.doc,
            matches[(index + 1) % matches.length].start,
          ),
        );
      },
    ),
  );

export const findPrev = () =>
  withScrollIntoView(
    createFindReplaceCommand(
      { type: FindReplaceActionTypes.FIND_PREV },
      (tr, state) => {
        const { matches, index } = getFindReplacePluginState(state);
        return tr.setSelection(
          TextSelection.create(
            state.doc,
            matches[(index - 1 + matches.length) % matches.length].start,
          ),
        );
      },
    ),
  );

export const replace = (replaceText: string) =>
  withScrollIntoView(
    createFindReplaceCommand(
      {
        type: FindReplaceActionTypes.REPLACE,
        replaceText,
      },
      (tr, state) => {
        const { matches, index } = getFindReplacePluginState(state);
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
  createFindReplaceCommand(
    {
      type: FindReplaceActionTypes.REPLACE_ALL,
      replaceText: replaceText,
    },
    (tr, state) => {
      const pluginState = getFindReplacePluginState(state);
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

export const cancelSearch = () =>
  createFindReplaceCommand({
    type: FindReplaceActionTypes.CANCEL,
  });

export const unfocus = () =>
  createFindReplaceCommand({
    type: FindReplaceActionTypes.UNFOCUS,
  });
