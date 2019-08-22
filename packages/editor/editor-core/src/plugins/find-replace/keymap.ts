import { keymap } from 'prosemirror-keymap';
import * as keymaps from '../../keymaps';
import { activate } from './commands';
import { Command } from '../../types';

const findText = (): Command => (state, dispatch) => {
  activate()(state, dispatch);
  return true;
};

const keymapPlugin = () => {
  const list = {};
  keymaps.bindKeymapWithCommand(keymaps.find.common!, findText(), list);
  return keymap(list);
};

export default keymapPlugin;
