import * as React from 'react';
import { createPlugin } from './plugin';
import { findReplacePluginKey } from './types';
import keymapPlugin from './keymap';
import { EditorPlugin, Command } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import {
  cancelSearch,
  replace,
  replaceAll,
  findNext,
  findPrev,
  unfocus,
} from './commands';
import FindReplaceToolbarButton from './ui/FindReplaceToolbarButton';
import { BatchFinder } from './utils/batch-finder';

export const findReplacePlugin = (): EditorPlugin => {
  let findReplaceInputRef: React.RefObject<HTMLInputElement>;
  const batchFinder = new BatchFinder();

  return {
    name: 'findReplace',

    pmPlugins() {
      return [
        {
          name: 'findReplace',
          plugin: ({ dispatch }) => createPlugin(dispatch),
        },
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
      containerElement,
    }) {
      // we need the editor to be in focus for scrollIntoView() to work
      // so we focus it while we run the command, then put focus back into
      // find replace component
      const runCommandWithEditorFocused = (fn: Function) => {
        editorView.focus();
        fn();
        if (findReplaceInputRef && findReplaceInputRef.current) {
          findReplaceInputRef.current.focus();
        }
      };
      const dispatchCommand = (cmd: Command) => {
        const { state, dispatch } = editorView;
        cmd(state, dispatch);
      };

      const handleFind = (keyword?: string) => {
        runCommandWithEditorFocused(() =>
          batchFinder.findAll(editorView, keyword, containerElement),
        );
      };
      const handleFindNext = () => {
        runCommandWithEditorFocused(() => dispatchCommand(findNext()));
      };
      const handleFindPrev = () => {
        runCommandWithEditorFocused(() => dispatchCommand(findPrev()));
      };
      const handleReplace = (replaceWith: string) => {
        runCommandWithEditorFocused(() =>
          dispatchCommand(replace(replaceWith)),
        );
      };
      const handleReplaceAll = (replaceWith: string) => {
        runCommandWithEditorFocused(() =>
          dispatchCommand(replaceAll(replaceWith)),
        );
      };
      const handleFindBlur = () => {
        dispatchCommand(unfocus());
      };
      const handleCancel = () => {
        batchFinder.cancelInProgress();
        dispatchCommand(cancelSearch());
        editorView.focus();
      };
      const handleRefSet = (ref: React.RefObject<HTMLInputElement>) => {
        findReplaceInputRef = ref;
      };

      return (
        <WithPluginState
          plugins={{
            findReplaceState: findReplacePluginKey,
          }}
          render={({ findReplaceState }) => {
            return (
              <FindReplaceToolbarButton
                isActive={findReplaceState.isActive}
                findText={findReplaceState.findText}
                index={findReplaceState.index}
                numMatches={findReplaceState.matches.length}
                replaceText={findReplaceState.replaceText}
                shouldFocus={findReplaceState.shouldFocus}
                popupsBoundariesElement={popupsBoundariesElement}
                popupsMountPoint={popupsMountPoint}
                popupsScrollableElement={popupsScrollableElement}
                isReducedSpacing={isToolbarReducedSpacing}
                onFindBlur={handleFindBlur}
                onCancel={handleCancel}
                onFind={handleFind}
                onFindNext={handleFindNext}
                onFindPrev={handleFindPrev}
                onReplace={handleReplace}
                onReplaceAll={handleReplaceAll}
                onRefSet={handleRefSet}
              />
            );
          }}
        />
      );
    },
  };
};
export default findReplacePlugin;

export * from './types';
