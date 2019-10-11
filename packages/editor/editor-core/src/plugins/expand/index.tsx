import * as React from 'react';
import { expand } from '@atlaskit/adf-schema';
import { EditorPlugin } from '../../types';
import { createPlugin } from './pm-plugins/main';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import { IconTable } from '../quick-insert/assets';
import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  addAnalytics,
  EVENT_TYPE,
  INPUT_METHOD,
} from '../analytics';

const expandPlugin = (): EditorPlugin => ({
  name: 'expand',

  nodes() {
    return [{ name: 'expand', node: expand }];
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
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.expand),
        description: formatMessage(messages.expandDescription),
        priority: 600,
        icon: () => <IconTable label={formatMessage(messages.expand)} />,
        action(insert, state) {
          const tr = insert(state.schema.nodes.expand.createAndFill({}));
          return addAnalytics(state, tr, {
            action: ACTION.INSERTED,
            actionSubject: ACTION_SUBJECT.DOCUMENT,
            actionSubjectId: ACTION_SUBJECT_ID.EXPAND,
            attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
            eventType: EVENT_TYPE.TRACK,
          });
        },
      },
    ],
  },
});

export default expandPlugin;
