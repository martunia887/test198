import * as React from 'react';
import { typeAheadQuery } from '@atlaskit/adf-schema';
import { EditorPlugin } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import { TypeAheadHandler } from './types';
import {
  createInitialPluginState,
  createPlugin,
  pluginKey as typeAheadPluginKey,
  PluginState as TypeAheadPluginState,
} from './pm-plugins/main';
import { inputRulePlugin } from './pm-plugins/input-rules';
import { keymapPlugin } from './pm-plugins/keymap';
import { TypeAhead } from './ui/TypeAhead';

const typeAheadPlugin: EditorPlugin = {
  name: 'typeAhead',

  marks() {
    return [{ name: 'typeAheadQuery', mark: typeAheadQuery }];
  },

  pmPlugins(typeAhead: Array<TypeAheadHandler> = []) {
    return [
      {
        name: 'typeAhead',
        plugin: ({ dispatch, reactContext }) =>
          createPlugin(dispatch, reactContext, typeAhead),
      },
      {
        name: 'typeAheadInputRule',
        plugin: ({ schema }) => inputRulePlugin(schema, typeAhead),
      },
      {
        name: 'typeAheadKeymap',
        plugin: () => keymapPlugin(),
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
          typeAhead: typeAheadPluginKey,
        }}
        render={({
          typeAhead = createInitialPluginState(),
        }: {
          typeAhead: TypeAheadPluginState; // it takes a typeAhead of type TypeAheadPluginState
        }) => {
          const { queryMarkPos } = typeAhead;
          const domRef =
            queryMarkPos !== null ? editorView.domAtPos(queryMarkPos) : null;
          const anchorElement = domRef
            ? ((domRef.node as HTMLElement).childNodes[
                domRef.offset
              ] as HTMLElement)
            : undefined;

          // console.log('=====typeAhead state', typeAhead);

          return (
            <TypeAhead
              editorView={editorView}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
              popupsScrollableElement={popupsScrollableElement}
              anchorElement={anchorElement}
              active={typeAhead.active}
              isLoading={!!typeAhead.itemsLoader}
              items={typeAhead.items}
              currentIndex={typeAhead.currentIndex}
              spotlight={
                typeAhead.typeAheadHandler &&
                typeAhead.typeAheadHandler.spotlight &&
                typeAhead.typeAheadHandler.spotlight(typeAhead.showSpotlight)
              } // todo - fix // I already have the plugin state here :thinking:
              // if I could get the EditorState, I can access to MentionProvider, which will be providing a Team Resource mention provider
            />
          );
        }}
      />
    );
  },
};

export { typeAheadPluginKey, TypeAheadPluginState };
export default typeAheadPlugin;
