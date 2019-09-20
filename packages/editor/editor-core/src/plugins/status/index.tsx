import * as React from 'react';
import { status } from '@atlaskit/adf-schema';
import { findDomRefAtPos } from 'prosemirror-utils';
import { EditorPlugin } from '../../types';
import createStatusPlugin, {
  StatusState,
  pluginKey,
  StatusType,
} from './plugin';
import WithPluginState from '../../ui/WithPluginState';
import StatusPicker from './ui/statusPicker';
import { commitStatusPicker, updateStatus, createStatus } from './actions';
import { keymapPlugin } from './keymap';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import { IconStatus } from '../quick-insert/assets';
import {
  addAnalytics,
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  INPUT_METHOD,
  EVENT_TYPE,
} from '../analytics';

export interface StatusPluginOptions {
  menuDisabled: boolean;
  useInlineWrapper?: boolean;
  allowZeroWidthSpaceAfter?: boolean;
}

const baseStatusPlugin = (options?: StatusPluginOptions): EditorPlugin => ({
  name: 'status',

  nodes() {
    return [{ name: 'status', node: status }];
  },

  pmPlugins() {
    return [
      {
        name: 'status',
        plugin: ({ dispatch, portalProviderAPI }) =>
          createStatusPlugin(dispatch, portalProviderAPI, options),
      },
      { name: 'statusKeymap', plugin: keymapPlugin },
    ];
  },

  contentComponent({ editorView }) {
    const domAtPos = editorView.domAtPos.bind(editorView);
    return (
      <WithPluginState
        plugins={{
          statusState: pluginKey,
        }}
        render={({ statusState = {} as StatusState }) => {
          const { showStatusPickerAt } = statusState;
          if (typeof showStatusPickerAt !== 'number') {
            return null;
          }

          const target = findDomRefAtPos(
            showStatusPickerAt,
            domAtPos,
          ) as HTMLElement;

          const statusNode: any = editorView.state.doc.nodeAt(
            showStatusPickerAt,
          );

          if (!statusNode || statusNode.type.name !== 'status') {
            return null;
          }

          const { text, color, localId } = statusNode.attrs;

          return (
            <StatusPicker
              isNew={statusState.isNew}
              target={target}
              defaultText={text}
              defaultColor={color}
              defaultLocalId={localId}
              onSelect={(status: StatusType) => {
                updateStatus(status)(editorView.state, editorView.dispatch);
              }}
              onTextChanged={(status: StatusType) => {
                updateStatus(status)(editorView.state, editorView.dispatch);
              }}
              closeStatusPicker={() => {
                commitStatusPicker()(editorView);
              }}
              onEnter={() => {
                commitStatusPicker()(editorView);
              }}
            />
          );
        }}
      />
    );
  },
});

const decorateWithPluginOptions = (
  plugin: EditorPlugin,
  options: StatusPluginOptions,
): EditorPlugin => {
  if (options.menuDisabled === true) {
    return plugin;
  }
  plugin.pluginsOptions = {
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.status),
        description: formatMessage(messages.statusDescription),
        priority: 700,
        keywords: ['lozenge'],
        icon: () => <IconStatus label={formatMessage(messages.status)} />,
        action(insert, state) {
          return addAnalytics(createStatus()(insert, state), {
            action: ACTION.INSERTED,
            actionSubject: ACTION_SUBJECT.DOCUMENT,
            actionSubjectId: ACTION_SUBJECT_ID.STATUS,
            attributes: {
              inputMethod: INPUT_METHOD.QUICK_INSERT,
            },
            eventType: EVENT_TYPE.TRACK,
          });
        },
      },
    ],
  };
  return plugin;
};

const statusPlugin = (options: StatusPluginOptions): EditorPlugin =>
  decorateWithPluginOptions(baseStatusPlugin(options), options);

export default statusPlugin;
