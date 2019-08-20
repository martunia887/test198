import * as React from 'react';
import { createPlugin, findReplacePluginKey } from './plugin';
import keymapPlugin from './keymap';
import { EditorPlugin } from '../../types';
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
    const { state, dispatch } = editorView;
    const handleCancel = () => {
      cancelSearch()(state, dispatch);
    };
    const handleFind = (keyword?: string, findFromPos?: number) => {
      find(keyword, findFromPos)(state, dispatch);
    };
    const handleFindNext = () => {
      findNext()(state, dispatch);
    };
    const handleFindPrev = () => {
      findPrev()(state, dispatch);
    };
    const handleReplace = (replaceWith: string) => {
      replace(replaceWith)(state, dispatch);
    };
    const handleReplaceAll = (replaceWith: string) => {
      replaceAll(replaceWith)(state, dispatch);
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
              editorView={editorView}
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
