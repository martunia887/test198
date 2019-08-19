import { createPlugin } from './plugin';
import keymapPlugin from './keymap';
import { EditorPlugin } from '../../types';

// todo: any options needed?
export const findReplacePlugin = (): EditorPlugin => ({
  pmPlugins() {
    return [
      { name: 'findReplace', plugin: ({ dispatch }) => createPlugin(dispatch) },
      {
        name: 'findReplaceKeymap',
        plugin: () => keymapPlugin(),
      },
    ];
  },
});
export default findReplacePlugin;
