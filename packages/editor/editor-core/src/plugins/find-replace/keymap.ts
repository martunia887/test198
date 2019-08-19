import { keymap } from 'prosemirror-keymap';
import * as keymaps from '../../keymaps';
import { find } from './commands';

const keymapPlugin = () => {
  const list = {};
  keymaps.bindKeymapWithCommand(keymaps.find.common!, find(), list);
  return keymap(list);
};

export default keymapPlugin;
