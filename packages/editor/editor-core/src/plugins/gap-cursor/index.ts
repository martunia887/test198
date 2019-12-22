import { EditorPlugin } from '../../types';
import keymapPlugin from './pm-plugins/keymap';
import plugin from './pm-plugins/main';

export { GapCursorSelection, Side } from './selection';
export { setCursorForTopLevelBlocks } from './actions';

const gapCursorPlugin = (): EditorPlugin => ({
  name: 'gapCursor',

  pmPlugins() {
    return [
      {
        name: 'gapCursorKeymap',
        plugin: () => keymapPlugin(),
      },
      {
        name: 'gapCursor',
        plugin: () => plugin,
      },
    ];
  },
});

export default gapCursorPlugin;
