import { EditorState, TextSelection, Selection } from 'prosemirror-state';
import { createFindReplaceCommand } from './plugin';
import { FindReplaceActionTypes } from './actions';
import { Match } from './types';

export const activate = () =>
  createFindReplaceCommand((state: EditorState) => {
    const { selection } = state;
    let findText: string | undefined;
    let matches: Match[] | undefined;
    let index: number | undefined;

    // if user has selected text, set that as the keyword
    if (selection instanceof TextSelection && !selection.empty) {
      // TODO: Handle this properly when we update selection on find next/prev - is this still a valid comment?
      findText = getSelectedText(selection);
      matches = findMatches(state, findText);
      index = findSearchIndex(selection, matches);
    }

    return {
      type: FindReplaceActionTypes.ACTIVATE,
      findText,
      matches,
      index,
    };
  });

export const find = (keyword?: string) =>
  createFindReplaceCommand((state: EditorState) => {
    const { selection } = state;

    const matches = keyword ? findMatches(state, keyword) : [];
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

export const replace = (replaceWith: string) =>
  createFindReplaceCommand({
    type: FindReplaceActionTypes.REPLACE,
    replaceText: replaceWith,
  });

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

function findMatches(state: EditorState, searchText: string): Match[] {
  let matches: Match[] = [];
  const searchTextLength = searchText.length;
  state.doc.descendants((node, pos) => {
    // TODO: Optimisation get string representation of top-level nodes and only recurse if match
    if (node.type === state.schema.nodes.text) {
      let index = node.textContent.indexOf(searchText);

      while (index !== -1) {
        // Find the next substring from the end of the first, so that they don't overlap
        const end = index + searchTextLength;
        // Add the substring index to the position of the node
        matches.push({ start: pos + index, end: pos + end });
        index = node.textContent.indexOf(searchText, end);
      }
    }
  });
  return matches;
}

function findSearchIndex(selection: Selection, matches: Match[]): number {
  const selectionPos = selection.from;
  return Math.max(matches.findIndex(match => match.start >= selectionPos), 0);
}
