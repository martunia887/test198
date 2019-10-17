import * as React from 'react';
import { expand, nestedExpand } from '@atlaskit/adf-schema';
import { findTable } from 'prosemirror-utils';
import { EditorPlugin } from '../../types';
import { createPlugin } from './pm-plugins/main';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import { IconExpand } from '../quick-insert/assets';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';
import { getToolbarConfig } from './toolbar';

const expandPlugin = (): EditorPlugin => ({
  name: 'expand',

  nodes() {
    return [
      { name: 'expand', node: expand },
      { name: 'nestedExpand', node: nestedExpand },
    ];
  },

  pmPlugins() {
    return [
      {
        name: 'expand',
        plugin: ({ dispatch, portalProviderAPI }) => {
          return createPlugin(dispatch, portalProviderAPI);
        },
      },
    ];
  },

  pluginsOptions: {
    floatingToolbar: getToolbarConfig,

    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.expand),
        description: formatMessage(messages.expandDescription),
        priority: 600,
        icon: () => <IconExpand label={formatMessage(messages.expand)} />,
        action(insert, state) {
          const { expand, nestedExpand } = state.schema.nodes;
          const expandType = findTable(state.selection) ? nestedExpand : expand;
          const tr = insert(expandType.createAndFill({}));
          return addAnalytics(state, tr, {
            action: ACTION.INSERTED,
            actionSubject: ACTION_SUBJECT.DOCUMENT,
            actionSubjectId:
              expandType === nestedExpand
                ? ACTION_SUBJECT_ID.NESTED_EXPAND
                : ACTION_SUBJECT_ID.EXPAND,
            attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
            eventType: EVENT_TYPE.TRACK,
          });
        },
      },
    ],
  },
});

export default expandPlugin;
