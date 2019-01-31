import { keymap } from 'prosemirror-keymap';
import { Plugin } from 'prosemirror-state';

import * as keymaps from '../../keymaps';
import { pluginKey } from './plugin';
import { Command } from '../../types';
import { StatusState } from './types';

export function keymapPlugin(): Plugin {
  const list = {};
  keymaps.bindKeymapWithCommand(keymaps.undo.common!, mayIgnoreUndo, list);
  return keymap(list);
}

const mayIgnoreUndo: Command = (state, dispatch?, view?) => {
  const statusState = pluginKey.getState(state) as StatusState;
  statusState.undo = true;
  return false;
};

export default keymapPlugin;
