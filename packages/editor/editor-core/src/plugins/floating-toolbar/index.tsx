import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { Plugin, PluginKey, Selection } from 'prosemirror-state';
import { findDomRefAtPos, findSelectedNodeOfType } from 'prosemirror-utils';
import { Popup, ProviderFactory } from '@atlaskit/editor-common';

import WithPluginState from '../../ui/WithPluginState';
import { EditorPlugin } from '../../types';
import { Dispatch } from '../../event-dispatcher';
import { ToolbarLoader } from './ui/ToolbarLoader';
import { FloatingToolbarHandler, FloatingToolbarConfig } from './types';

import {
  pluginKey as editorDisabledPluginKey,
  EditorDisabledPluginState,
} from '../editor-disabled';

const getRelevantConfig = (
  selection: Selection<any>,
  configs: Array<FloatingToolbarConfig>,
): FloatingToolbarConfig | undefined => {
  // node selections always take precedence, see if
  const selectedConfig = configs.find(
    config => !!findSelectedNodeOfType(config.nodeType)(selection),
  );

  if (selectedConfig) {
    return selectedConfig;
  }

  // create mapping of node type name to configs
  const configByNodeType: Record<string, FloatingToolbarConfig> = {};
  configs.forEach(config => {
    if (Array.isArray(config.nodeType)) {
      config.nodeType.forEach(nodeType => {
        configByNodeType[nodeType.name] = config;
      });
    } else {
      configByNodeType[config.nodeType.name] = config;
    }
  });

  // search up the tree from selection
  const { $from } = selection;
  for (let i = $from.depth; i > 0; i--) {
    const node = $from.node(i);

    const matchedConfig = configByNodeType[node.type.name];
    if (matchedConfig) {
      return matchedConfig;
    }
  }

  return;
};

const getDomRefFromSelection = (view: EditorView) =>
  findDomRefAtPos(
    view.state.selection.from,
    view.domAtPos.bind(view),
  ) as HTMLElement;

const floatingToolbarPlugin: EditorPlugin = {
  name: 'floatingToolbar',

  pmPlugins(floatingToolbarHandlers: Array<FloatingToolbarHandler> = []) {
    return [
      {
        // Should be after all toolbar plugins
        name: 'floatingToolbar',
        plugin: ({ dispatch, reactContext, providerFactory }) =>
          floatingToolbarPluginFactory({
            dispatch,
            floatingToolbarHandlers,
            reactContext,
            providerFactory,
          }),
      },
    ];
  },

  contentComponent({
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    editorView,
    providerFactory,
  }) {
    return (
      <WithPluginState
        plugins={{
          floatingToolbarConfig: pluginKey,
          editorDisabledPlugin: editorDisabledPluginKey,
        }}
        render={({
          editorDisabledPlugin,
          floatingToolbarConfig,
        }: {
          floatingToolbarConfig: FloatingToolbarConfig;
          editorDisabledPlugin: EditorDisabledPluginState;
        }) => {
          if (floatingToolbarConfig) {
            const {
              title,
              getDomRef = getDomRefFromSelection,
              items,
              align = 'center',
              className = '',
              height,
              width,
            } = floatingToolbarConfig;
            const targetRef = getDomRef(editorView);

            if (targetRef && !(editorDisabledPlugin || {}).editorDisabled) {
              return (
                <Popup
                  ariaLabel={title}
                  offset={[0, 12]}
                  target={targetRef}
                  alignY="bottom"
                  fitHeight={height}
                  fitWidth={width}
                  alignX={align}
                  stick={true}
                  mountTo={popupsMountPoint}
                  boundariesElement={popupsBoundariesElement}
                  scrollableElement={popupsScrollableElement}
                >
                  <ToolbarLoader
                    items={items}
                    dispatchCommand={fn =>
                      fn && fn(editorView.state, editorView.dispatch)
                    }
                    editorView={editorView}
                    className={className}
                    focusEditor={() => editorView.focus()}
                    providerFactory={providerFactory}
                    popupsMountPoint={popupsMountPoint}
                    popupsBoundariesElement={popupsBoundariesElement}
                    popupsScrollableElement={popupsScrollableElement}
                  />
                </Popup>
              );
            }
          }
          return null;
        }}
      />
    );
  },
};

export default floatingToolbarPlugin;

/**
 *
 * ProseMirror Plugin
 *
 */

export const pluginKey = new PluginKey('floatingToolbarPluginKey');

function floatingToolbarPluginFactory(options: {
  floatingToolbarHandlers: Array<FloatingToolbarHandler>;
  dispatch: Dispatch<FloatingToolbarConfig | undefined>;
  reactContext: () => { [key: string]: any };
  providerFactory: ProviderFactory;
}) {
  const {
    floatingToolbarHandlers,
    dispatch,
    reactContext,
    providerFactory,
  } = options;
  return new Plugin({
    key: pluginKey,
    state: {
      init: () => {
        ToolbarLoader.preload();
      },
      apply(tr, pluginState, oldState, newState) {
        const { intl } = reactContext();
        const activeConfigs = floatingToolbarHandlers
          .map(handler => handler(newState, intl, providerFactory))
          .filter(Boolean) as Array<FloatingToolbarConfig>;

        const relevantConfig =
          activeConfigs && getRelevantConfig(newState.selection, activeConfigs);

        if (
          (relevantConfig && relevantConfig.title) !==
          (pluginState && pluginState.title)
        ) {
          dispatch(pluginKey, relevantConfig);
          return relevantConfig;
        }

        return pluginState;
      },
    },
  });
}
