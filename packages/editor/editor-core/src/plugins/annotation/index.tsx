import * as React from 'react';
import { EditorPlugin } from '../../types';
import { annotation } from '@atlaskit/adf-schema';
import { plugin, pluginKey, HyperlinkState } from './pm-plugins/main';
import WithPluginState from '../../ui/WithPluginState';
import { insertComment } from './commands';

const annotationPlugin: EditorPlugin = {
  marks() {
    return [
      {
        name: 'annotation',
        mark: annotation,
      },
    ];
  },

  pmPlugins() {
    return [
      {
        name: 'annotationPlugin',
        plugin: ({ dispatch, props }) =>
          plugin(dispatch, props.annotationProvider),
      },
    ];
  },

  contentComponent({
    popupsBoundariesElement,
    popupsMountPoint,
    popupsScrollableElement,
    editorView,
  }) {
    return (
      <WithPluginState
        plugins={{
          pluginState: pluginKey,
        }}
        render={({ pluginState }: { pluginState: HyperlinkState }) => {
          const Component = pluginState.component.component;
          return pluginState.component.component ? (
            <Component
              actions={pluginState.activeInlineComment}
              isSelection={!!pluginState.activeText}
              popupsMountPoint={popupsMountPoint}
              boundariesElement={popupsBoundariesElement}
              scrollableElement={popupsScrollableElement}
              onSuccess={(id: string) =>
                insertComment(id)(editorView.state, editorView.dispatch)
              }
            />
          ) : null;
        }}
      />
    );
  },
};

export default annotationPlugin;
