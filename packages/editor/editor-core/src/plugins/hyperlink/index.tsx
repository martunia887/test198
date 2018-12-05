import * as React from 'react';
import { link, WithProviders } from '@atlaskit/editor-common';
import { EditorPlugin } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import { createInputRulePlugin } from './pm-plugins/input-rule';
import { createKeymapPlugin } from './pm-plugins/keymap';
import { plugin, stateKey, HyperlinkState } from './pm-plugins/main';
import fakeCursorToolbarPlugin from './pm-plugins/fake-cursor-for-toolbar';
import HyperlinkToolbar from './ui';

const hyperlinkPlugin: EditorPlugin = {
  marks() {
    return [{ name: 'link', mark: link }];
  },

  pmPlugins() {
    return [
      { name: 'hyperlink', plugin: ({ dispatch }) => plugin(dispatch) },
      {
        name: 'fakeCursorToolbarPlugin',
        plugin: () => fakeCursorToolbarPlugin,
      },
      {
        name: 'hyperlinkInputRule',
        plugin: ({ schema }) => createInputRulePlugin(schema),
      },
      {
        name: 'hyperlinkKeymap',
        plugin: ({ schema, props }) => createKeymapPlugin(schema, props),
      },
    ];
  },

  contentComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    providerFactory,
  }) {
    const renderToolbar = providers => (
      <WithPluginState
        plugins={{ hyperlinkState: stateKey }}
        render={({ hyperlinkState }: { hyperlinkState?: HyperlinkState }) => (
          <HyperlinkToolbar
            hyperlinkState={hyperlinkState}
            view={editorView}
            popupsMountPoint={popupsMountPoint}
            popupsBoundariesElement={popupsBoundariesElement}
            activityProvider={
              providers ? providers.activityProvider : undefined
            }
          />
        )}
      />
    );

    return (
      <WithProviders
        providerFactory={providerFactory}
        providers={['activityProvider']}
        renderNode={renderToolbar}
      />
    );
  },
};

export default hyperlinkPlugin;
