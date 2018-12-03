import * as React from 'react';
import { createPlugin, pluginKey } from './pm-plugins/main';
import { EditorPlugin } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import RefsMenu from './ui/RefsMenu';

const refsPlugin: EditorPlugin = {
  pmPlugins() {
    return [
      {
        name: 'refs',
        plugin: ({ dispatch }) => {
          return createPlugin(dispatch);
        },
      },
    ];
  },

  contentComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
  }) {
    return (
      <WithPluginState
        plugins={{
          pluginState: pluginKey,
        }}
        render={({ pluginState }) => (
          <RefsMenu
            editorView={editorView}
            isOpen={pluginState.showReferenceMenu}
            mountPoint={popupsMountPoint}
            boundariesElement={popupsBoundariesElement}
            scrollableElement={popupsScrollableElement}
            nodePosition={pluginState.nodePosition}
          />
        )}
      />
    );
  },
};

export default refsPlugin;
