import * as React from 'react';
import { createPlugin, findReplacePluginKey } from './plugin';
import keymapPlugin from './keymap';
import { EditorPlugin } from '../../types';
import FindReplace from './ui/FindReplace';
import WithPluginState from '../../ui/WithPluginState';

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

  primaryToolbarComponent({
    popupsBoundariesElement,
    popupsMountPoint,
    popupsScrollableElement,
    isToolbarReducedSpacing,
  }) {
    return (
      <WithPluginState
        plugins={{
          findReplaceState: findReplacePluginKey,
        }}
        render={({ findReplaceState }): any => {
          return (
            <FindReplace
              findReplaceState={findReplaceState}
              popupsBoundariesElement={popupsBoundariesElement}
              popupsMountPoint={popupsMountPoint}
              popupsScrollableElement={popupsScrollableElement}
              isReducedSpacing={isToolbarReducedSpacing}
            />
          );
        }}
      />
    );
  },
});
export default findReplacePlugin;
