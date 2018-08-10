import * as React from 'react';
import EditorImageIcon from '@atlaskit/icon/glyph/editor/image';
import {
  media,
  mediaGroup,
  mediaSingle,
  caption,
} from '@atlaskit/editor-common';

import { EditorPlugin } from '../../types';

import {
  stateKey as pluginKey,
  createPlugin,
  MediaProvider,
  MediaState,
  MediaStateManager,
  DefaultMediaStateManager,
} from './pm-plugins/main';
import keymapMediaSinglePlugin from './pm-plugins/keymap-media-single';
import keymapPlugin from './pm-plugins/keymap';
import ToolbarMedia from './ui/ToolbarMedia';
import MediaSingleEdit from './ui/MediaSingleEdit';
import { mediaSingleNodeView } from './nodeviews/media-single';
import { mediaGroupNodeView } from './nodeviews/media-group';
import { CustomMediaPicker } from './types';

export {
  MediaState,
  MediaStateManager,
  DefaultMediaStateManager,
  MediaProvider,
  CustomMediaPicker,
};

export interface MediaOptions {
  provider?: Promise<MediaProvider>;
  allowMediaSingle?: boolean | MediaSingleOptions;
  allowMediaGroup?: boolean;
  customDropzoneContainer?: HTMLElement;
  customMediaPicker?: CustomMediaPicker;
}

export interface MediaSingleOptions {
  disableLayout?: boolean;
}

const mediaPlugin = (options?: MediaOptions): EditorPlugin => ({
  nodes() {
    return [
      { name: 'caption', node: caption },
      { name: 'mediaGroup', node: mediaGroup },
      { name: 'mediaSingle', node: mediaSingle },
      { name: 'media', node: media },
    ].filter(node => {
      const { allowMediaGroup = true, allowMediaSingle = false } =
        options || {};

      if (node.name === 'mediaGroup') {
        return allowMediaGroup;
      }

      if (node.name === 'mediaSingle') {
        return allowMediaSingle;
      }

      return true;
    });
  },

  pmPlugins() {
    return [
      {
        name: 'media',
        plugin: ({
          schema,
          props,
          dispatch,
          eventDispatcher,
          providerFactory,
          errorReporter,
          portalProviderAPI,
          reactContext,
        }) =>
          createPlugin(
            schema,
            {
              providerFactory,
              nodeViews: {
                mediaGroup: mediaGroupNodeView(
                  portalProviderAPI,
                  providerFactory,
                ),
                mediaSingle: mediaSingleNodeView(
                  portalProviderAPI,
                  eventDispatcher,
                  providerFactory,
                ),

                // media rendering handled by the above nodeviews
                // also, having an empty element next to the
                // media that gets rendered above it hides the cursor
                // selection webkit does
                media: (node, view, getPos) => {
                  const dom = document.createElement('div');

                  // don't make display: none otherwise Chrome
                  // will ignore it for cursor events

                  // hide the outline from ProseMirror so it appears
                  // invisible
                  dom.style.outline = 'none';

                  // dom.style.position = 'relative';
                  // dom.style.top = '-10000px';
                  // dom.style.left = '-10000px';

                  // don't actually edit it
                  dom.contentEditable = 'false';
                  dom.style.cursor = 'transparent';
                  return {
                    dom,
                    contentDOM: dom,
                  };
                },
              },
              errorReporter,
              uploadErrorHandler: props.uploadErrorHandler,
              waitForMediaUpload: props.waitForMediaUpload,
              customDropzoneContainer:
                options && options.customDropzoneContainer,
              customMediaPicker: options && options.customMediaPicker,
            },
            reactContext,
            dispatch,
            props.appearance,
          ),
      },
      { name: 'mediaKeymap', plugin: ({ schema }) => keymapPlugin(schema) },
    ].concat(
      options && options.allowMediaSingle
        ? {
            name: 'mediaSingleKeymap',
            plugin: ({ schema }) => keymapMediaSinglePlugin(schema),
          }
        : [],
    );
  },

  contentComponent({ editorView }) {
    if (!options) {
      return null;
    }

    const { allowMediaSingle } = options;
    let disableLayout: boolean | undefined;
    if (typeof allowMediaSingle === 'object') {
      disableLayout = allowMediaSingle.disableLayout;
    }

    if (
      (typeof allowMediaSingle === 'boolean' && allowMediaSingle === false) ||
      (typeof disableLayout === 'boolean' && disableLayout === true)
    ) {
      return null;
    }

    const pluginState = pluginKey.getState(editorView.state);

    return <MediaSingleEdit pluginState={pluginState} />;
  },

  secondaryToolbarComponent({ editorView, disabled }) {
    return (
      <ToolbarMedia
        editorView={editorView}
        pluginKey={pluginKey}
        isDisabled={disabled}
        isReducedSpacing={true}
      />
    );
  },

  pluginsOptions: {
    quickInsert: [
      {
        title: 'Files and images',
        priority: 200,
        keywords: ['media'],
        icon: () => <EditorImageIcon label="Files and images" />,
        action(insert, state) {
          const pluginState = pluginKey.getState(state);
          pluginState.showMediaPicker();
          return insert();
        },
      },
    ],
  },
});

export default mediaPlugin;
