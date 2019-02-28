import * as React from 'react';
import { MarkSpec } from 'prosemirror-model';
import { JiraIcon } from '@atlaskit/logo';
import { EditorPlugin } from '../../types';
import createInlineJiraPlugin from './pm-plugins/main';

const title = 'Create Jira issue';

const jiraMark: MarkSpec = {
  inclusive: true,
};

export default {
  marks() {
    return [{ name: 'jira', mark: jiraMark }];
  },
  pmPlugins() {
    return [
      {
        name: 'inline-jira',
        plugin: ({ portalProviderAPI, schema, props }) =>
          createInlineJiraPlugin(portalProviderAPI),
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
          const mark = state.schema.marks.jira.create();
          const jiraText = state.schema.text('', [mark]);
          return insert(jiraText);
        },
      },
    ],
  },
} as EditorPlugin;
