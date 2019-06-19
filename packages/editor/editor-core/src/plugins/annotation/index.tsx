import * as React from 'react';
import { EditorPlugin } from '../../types';
import { annotation, annotationQuery } from '@atlaskit/adf-schema';
import { plugin, pluginKey, HyperlinkState } from './pm-plugins/main';
import WithPluginState from '../../ui/WithPluginState';
import { insertComment, removeComment, removeQueryMark } from './commands';
import { findDomRefAtPos } from 'prosemirror-utils';
import { getToolbarConfig } from './toolbar';

const annotationPlugin: EditorPlugin = {
  marks() {
    return [
      {
        name: 'annotation',
        mark: annotation,
      },
      {
        name: 'annotationQuery',
        mark: annotationQuery,
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

  contentComponent({ editorView }) {
    return (
      <WithPluginState
        plugins={{
          pluginState: pluginKey,
        }}
        render={({ pluginState }: { pluginState: HyperlinkState }) => {
          const Component = pluginState.component.component;
          let element;
          let markerRef;
          if (
            pluginState.activeInlineComment ||
            pluginState.showAnnotationToolbar
          ) {
            element = findDomRefAtPos(
              editorView.state.selection.from,
              editorView.domAtPos.bind(editorView),
            );
          }

          if (pluginState.activeInlineComment) {
            const getMark = pluginState.activeInlineComment.node.marks.find(
              (mark: Mark) => mark.attrs.annotationType === 'inlineComment',
            );
            markerRef = getMark && getMark.attrs.id;
          }

          return pluginState.component.component ? (
            <Component
              element={element}
              markerRef={markerRef}
              selection={!!pluginState.showAnnotationToolbar}
              onSuccess={(id: string) => {
                insertComment(id)(editorView.state, editorView.dispatch);
              }}
              onCancel={() =>
                removeQueryMark()(editorView.state, editorView.dispatch)
              }
              onDelete={(id: string) =>
                removeComment(id)(editorView.state, editorView.dispatch)
              }
            />
          ) : null;
        }}
      />
    );
  },

  pluginsOptions: {
    floatingToolbar: getToolbarConfig,
  },
};

export default annotationPlugin;
