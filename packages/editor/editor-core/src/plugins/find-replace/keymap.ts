import { EditorState, TextSelection } from 'prosemirror-state';
import * as keymaps from '../../keymaps';
import { keymap } from 'prosemirror-keymap';
import { createFindReplaceCommand } from '.';
import { FindReplaceActionTypes } from './actions';

const getSelectedText = (selection: TextSelection): string => {
  let text = '';
  const selectedContent = selection.content().content;
  for (let i = 0; i < selectedContent.childCount; i++) {
    text += selectedContent.child(i).textContent;
  }
  return text;
};

const findCommand = () =>
  createFindReplaceCommand((state: EditorState) => {
    const { selection } = state;

    if (selection instanceof TextSelection && !selection.empty) {
      // find selected text and dispatch find action
      return {
        type: FindReplaceActionTypes.FIND,
        searchWord: getSelectedText(selection),
      };
    }

    return {
      type: FindReplaceActionTypes.ACTIVATE,
    };
  });

const keymapPlugin = () => {
  const list = {};
  keymaps.bindKeymapWithCommand(keymaps.find.common!, findCommand(), list);
  return keymap(list);
};

export default keymapPlugin;
