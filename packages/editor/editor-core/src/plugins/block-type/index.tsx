import * as React from 'react';
import { heading, blockquote, hardBreak } from '@atlaskit/adf-schema';
import { EditorPlugin, AllowedBlockTypes } from '../../types';
import { ToolbarSize } from '../../ui/Toolbar';
import { createPlugin, pluginKey } from './pm-plugins/main';
import keymapPlugin from './pm-plugins/keymap';
import inputRulePlugin from './pm-plugins/input-rule';
import ToolbarBlockType from './ui/ToolbarBlockType';
import WithPluginState from '../../ui/WithPluginState';
import { setBlockTypeWithAnalytics } from './commands';
import { messages } from './types';
import { NodeSpec } from 'prosemirror-model';
import {
  addAnalytics,
  INPUT_METHOD,
  ACTION_SUBJECT_ID,
  EVENT_TYPE,
  ACTION_SUBJECT,
  ACTION,
} from '../analytics';
import { toggleBlockQuote, tooltip } from '../../keymaps';
import { IconQuote } from '../quick-insert/assets';

interface BlockTypeNode {
  name: AllowedBlockTypes;
  node: NodeSpec;
}

const blockType: EditorPlugin = {
  nodes({ allowBlockType }) {
    const nodes: BlockTypeNode[] = [
      { name: 'heading', node: heading },
      { name: 'blockquote', node: blockquote },
      { name: 'hardBreak', node: hardBreak },
    ];

    if (allowBlockType) {
      const exclude = allowBlockType.exclude ? allowBlockType.exclude : [];
      return nodes.filter(node => exclude.indexOf(node.name) === -1);
    }

    return nodes;
  },

  pmPlugins() {
    return [
      {
        name: 'blockType',
        plugin: ({ props, dispatch }) =>
          createPlugin(dispatch, props.appearance),
      },
      {
        name: 'blockTypeInputRule',
        plugin: ({ schema }) => inputRulePlugin(schema),
      },
      // Needs to be lower priority than prosemirror-tables.tableEditing
      // plugin as it is currently swallowing right/down arrow events inside tables
      {
        name: 'blockTypeKeyMap',
        plugin: ({ schema }) => keymapPlugin(schema),
      },
    ];
  },

  primaryToolbarComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    toolbarSize,
    disabled,
    isToolbarReducedSpacing,
    eventDispatcher,
  }) {
    const isSmall = toolbarSize < ToolbarSize.XL;
    const boundSetBlockType = (name: string) =>
      setBlockTypeWithAnalytics(name, INPUT_METHOD.TOOLBAR)(
        editorView.state,
        editorView.dispatch,
      );

    return (
      <WithPluginState
        editorView={editorView}
        eventDispatcher={eventDispatcher}
        plugins={{
          pluginState: pluginKey,
        }}
        render={({ pluginState }) => {
          return (
            <ToolbarBlockType
              isSmall={isSmall}
              isDisabled={disabled}
              isReducedSpacing={isToolbarReducedSpacing}
              setBlockType={boundSetBlockType}
              pluginState={pluginState}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
              popupsScrollableElement={popupsScrollableElement}
            />
          );
        }}
      />
    );
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.blockquote),
        description: formatMessage(messages.blockquoteDescription),
        priority: 1300,
        keyshortcut: tooltip(toggleBlockQuote),
        icon: () => <IconQuote label={formatMessage(messages.blockquote)} />,
        action(insert, state) {
          const tr = insert(
            state.schema.nodes.blockquote.createChecked(
              {},
              state.schema.nodes.paragraph.createChecked(),
            ),
          );

          return addAnalytics(tr, {
            action: ACTION.FORMATTED,
            actionSubject: ACTION_SUBJECT.TEXT,
            eventType: EVENT_TYPE.TRACK,
            actionSubjectId: ACTION_SUBJECT_ID.FORMAT_BLOCK_QUOTE,
            attributes: {
              inputMethod: INPUT_METHOD.QUICK_INSERT,
            },
          });
        },
      },
    ],
  },
};

export default blockType;
export { pluginKey, BlockTypeState } from './pm-plugins/main';
