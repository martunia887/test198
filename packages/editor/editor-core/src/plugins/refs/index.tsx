import * as React from 'react';
import { createPlugin, pluginKey } from './pm-plugins/main';
import { EditorPlugin } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import TitleMenu from './ui/TitleMenu';

const refsPlugin: EditorPlugin = {
  pmPlugins() {
    return [
      {
        name: 'refs',
        plugin: ({ dispatch, providerFactory }) => {
          return createPlugin(dispatch, providerFactory);
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
        render={({ pluginState }) => {
          if (!pluginState.titleMenuTarget) {
            return null;
          }

          return (
            <TitleMenu
              editorView={editorView}
              target={pluginState.titleMenuTarget}
              mountPoint={popupsMountPoint}
              boundariesElement={popupsBoundariesElement}
              scrollableElement={popupsScrollableElement}
              nodePosition={pluginState.nodePosition}
            />
          );
        }}
      />
    );
  },
};

export default refsPlugin;
