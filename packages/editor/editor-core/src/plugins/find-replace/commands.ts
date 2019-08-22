import {
  EditorState,
  TextSelection,
  Selection,
  Transaction,
} from 'prosemirror-state';
import { createFindReplaceCommand, getFindReplacePluginState } from './plugin';
import { FindReplaceActionTypes } from './actions';
import { Match } from './types';
import { findMatches, findSearchIndex } from './utils';

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
  createFindReplaceCommand((state: EditorState) => {
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

const getSelectedText = (selection: TextSelection): string => {
  let text = '';
  const selectedContent = selection.content().content;
  for (let i = 0; i < selectedContent.childCount; i++) {
    text += selectedContent.child(i).textContent;
  }
  return text;
};
