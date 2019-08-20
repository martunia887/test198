import { EditorState, TextSelection } from 'prosemirror-state';
import { createFindReplaceCommand } from './plugin';
import { FindReplaceActionTypes } from './actions';

export const find = (keyword?: string) =>
  createFindReplaceCommand((state: EditorState) => {
    const { selection } = state;

    if (!keyword && selection instanceof TextSelection && !selection.empty) {
      keyword = getSelectedText(selection);
    }

    if (keyword) {
      // if user has selected text, set that as the keyword
      return {
        type: FindReplaceActionTypes.FIND,
        searchWord: keyword,
      };
    }

    return {
      type: FindReplaceActionTypes.ACTIVATE,
    };
  });

export const replace = (replaceWith: string) =>
  createFindReplaceCommand({
    type: FindReplaceActionTypes.REPLACE,
    replaceWord: replaceWith,
  });

export const replaceAll = (replaceWith: string) =>
  createFindReplaceCommand({
    type: FindReplaceActionTypes.REPLACE_ALL,
    replaceWord: replaceWith,
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
