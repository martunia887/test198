import * as React from 'react';
import { createPlugin, findReplacePluginKey } from './plugin';
import keymapPlugin from './keymap';
import { EditorPlugin, Command } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import {
  cancelSearch,
  find,
  replace,
  replaceAll,
  findNext,
  findPrev,
} from './commands';
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
    const fireCommand = (cmd: Command) => {
      const { state, dispatch } = editorView;
      cmd(state, dispatch);
    };

    const handleCancel = () => {
      fireCommand(cancelSearch());
    };
    const handleFind = (keyword?: string) => {
      fireCommand(find(keyword));
    };
    const handleFindNext = () => {
      fireCommand(findNext());
    };
    const handleFindPrev = () => {
      fireCommand(findPrev());
    };
    const handleReplace = (replaceWith: string) => {
      fireCommand(replace(replaceWith));
    };
    const handleReplaceAll = (replaceWith: string) => {
      fireCommand(replaceAll(replaceWith));
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
              onFindNext={handleFindNext}
              onFindPrev={handleFindPrev}
              onReplace={handleReplace}
              onReplaceAll={handleReplaceAll}
            />
          );
        }}
      />
    );
  },
});
export default findReplacePlugin;
