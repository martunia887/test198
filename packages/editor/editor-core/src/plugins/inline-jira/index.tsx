import * as React from 'react';
import { Schema } from 'prosemirror-model';
import { JiraIcon } from '@atlaskit/logo';
import { EditorPlugin } from '../../types';
import createInlineJiraPlugin from './pm-plugins/main';

const title = 'create Jira issue';

const createInlineJira = (schema: Schema) => {};

export default {
  pmPlugins() {
    return [
      {
        name: 'inline-jira',
        plugin: ({ schema, props }) => createInlineJiraPlugin(),
      },
    ];
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        title: title,
        priority: 600,
        icon: () => <JiraIcon size="small" label={title} />,
        action(insert, state) {
          return false;
          // return insert(createInlineJira(state.schema));
        },
      },
    ],
  },
} as EditorPlugin;
