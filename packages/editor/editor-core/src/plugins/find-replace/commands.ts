import { EditorState, TextSelection } from 'prosemirror-state';
import { createFindReplaceCommand, getFindReplacePluginState } from './plugin';
import { FindReplaceActionTypes } from './actions';
import { Match } from './types';

export const find = (keyword?: string) =>
  createFindReplaceCommand((state: EditorState) => {
    const { selection } = state;

    // if user has selected text, set that as the keyword
    if (selection instanceof TextSelection && !selection.empty) {
      // TODO: Handle this properly when we update selection on find next/prev
      keyword = getSelectedText(selection);
    }

    const matches = keyword ? findMatches(state, keyword) : [];

    // todo: this is always 1, get selection pos or store
    let selectionPos = selection.from;
    const index = matches.findIndex(match => match.start > selectionPos) || 0;

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

function findMatches(state: EditorState, searchText: string): Match[] {
  let matches: Match[] = [];
  const searchTextLength = searchText.length;
  state.doc.descendants((node, pos) => {
    // Optimisation get string representation of top-level nodes and only recurse if match
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
