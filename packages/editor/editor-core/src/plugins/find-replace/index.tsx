import * as React from 'react';
import { createPlugin, findReplacePluginKey } from './plugin';
import keymapPlugin from './keymap';
import { EditorPlugin } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import { cancelSearch, find } from './commands';
import FindReplaceToolbarButton from './ui/FindReplaceToolbarButton';

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
    editorView,
  }) {
    const { state, dispatch } = editorView;
    const handleCancel = () => {
      cancelSearch()(state, dispatch);
    };
    const handleFind = (keyword?: string) => {
      find(keyword)(state, dispatch);
    };

    return (
      <WithPluginState
        plugins={{
          findReplaceState: findReplacePluginKey,
        }}
        render={({ findReplaceState }): any => {
          return (
            <FindReplaceToolbarButton
              findReplaceState={findReplaceState}
              popupsBoundariesElement={popupsBoundariesElement}
              popupsMountPoint={popupsMountPoint}
              popupsScrollableElement={popupsScrollableElement}
              isReducedSpacing={isToolbarReducedSpacing}
              onCancel={handleCancel}
              onFind={handleFind}
            />
          );
        }}
      />
    );
  },
});
export default findReplacePlugin;
