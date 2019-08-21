import { keymap } from 'prosemirror-keymap';
import * as keymaps from '../../keymaps';
import { find } from './commands';
import { Command } from '../../types';

const findText = (): Command => (state, dispatch) => {
  find()(state, dispatch);
  return true;
};

const keymapPlugin = () => {
  const list = {};
  keymaps.bindKeymapWithCommand(keymaps.find.common!, findText(), list);
  return keymap(list);
};

export default keymapPlugin;
