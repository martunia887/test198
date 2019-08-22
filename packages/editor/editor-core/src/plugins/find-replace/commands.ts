import {
  EditorState,
  TextSelection,
  Selection,
  Transaction,
} from 'prosemirror-state';
import { createFindReplaceCommand, getFindReplacePluginState } from './plugin';
import { FindReplaceActionTypes } from './actions';
import { Match } from './types';
import { findMatches } from './utils';

export const activate = () =>
  createFindReplaceCommand(
    (state: EditorState) => {
      const { selection } = state;
      let findText: string | undefined;
      let matches: Match[] | undefined;
      let index: number | undefined;

      // if user has selected text, set that as the keyword
      if (selection instanceof TextSelection && !selection.empty) {
        // TODO: Handle this properly when we update selection on find next/prev - is this still a valid comment?
        findText = getSelectedText(selection);
        matches = findMatches(state.doc, findText);
        index = findSearchIndex(selection, matches);
      }

      return {
        type: FindReplaceActionTypes.ACTIVATE,
        findText,
        matches,
        index,
      };
    },
    (tr: Transaction, state: EditorState) =>
      tr.setSelection(Selection.atStart(tr.doc)),
  );

export const find = (keyword?: string) =>
  createFindReplaceCommand((state: EditorState) => {
    const { selection } = state;

    const matches = keyword ? findMatches(state.doc, keyword) : [];
    const index = findSearchIndex(selection, matches);

    return {
      type: FindReplaceActionTypes.FIND,
      findText: keyword || '',
      matches,
      index,
    };
  });

export const findNext = () =>
  createFindReplaceCommand({
    type: FindReplaceActionTypes.FIND_NEXT,
  });

export const findPrev = () =>
  createFindReplaceCommand({
    type: FindReplaceActionTypes.FIND_PREV,
  });

export const replace = (replaceText: string) =>
  createFindReplaceCommand(
    {
      type: FindReplaceActionTypes.REPLACE,
      replaceText,
    },
    (tr, state) => {
      const pluginState = getFindReplacePluginState(state);
      const replacePos = pluginState.matches[pluginState.index];
      return tr.insertText(replaceText, replacePos.start, replacePos.end);
    },
  );

export const replaceAll = (replaceWith: string) =>
  createFindReplaceCommand({
    type: FindReplaceActionTypes.REPLACE_ALL,
    replaceText: replaceWith,
  });

export const cancelSearch = () =>
  createFindReplaceCommand({
    type: FindReplaceActionTypes.CANCEL,
  });

const getSelectedText = (selection: TextSelection): string => {
  let text = '';
  const selectedContent = selection.content().content;
  for (let i = 0; i < selectedContent.childCount; i++) {
    text += selectedContent.child(i).textContent;
  }
  return text;
};

function findSearchIndex(selection: Selection, matches: Match[]): number {
  const selectionPos = selection.from;
  return Math.max(matches.findIndex(match => match.start >= selectionPos), 0);
}
