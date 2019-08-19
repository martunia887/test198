import { EditorState, TextSelection } from 'prosemirror-state';
import { createFindReplaceCommand } from './plugin';
import { FindReplaceActionTypes } from './actions';

export const find = () =>
  createFindReplaceCommand((state: EditorState) => {
    const { selection } = state;

    if (selection instanceof TextSelection && !selection.empty) {
      // if user has selected text, set that as the keyword
      return {
        type: FindReplaceActionTypes.FIND,
        searchWord: getSelectedText(selection),
      };
    }

    return {
      type: FindReplaceActionTypes.ACTIVATE,
    };
  });

const getSelectedText = (selection: TextSelection): string => {
  let text = '';
  const selectedContent = selection.content().content;
  for (let i = 0; i < selectedContent.childCount; i++) {
    text += selectedContent.child(i).textContent;
  }
  return text;
};
