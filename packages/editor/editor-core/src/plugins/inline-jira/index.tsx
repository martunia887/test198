import * as React from 'react';
import { JiraIcon } from '@atlaskit/logo';
import { EditorPlugin } from '../../types';
import createInlineJiraPlugin from './pm-plugins/main';
import { jiraQuery, jiraIssue, jiraIssueSelect } from '@atlaskit/adf-schema';

const title = 'Create Jira issue';

export default {
  nodes() {
    return [
      { name: 'jiraIssue', node: jiraIssue },
      { name: 'jiraIssueSelect', node: jiraIssueSelect },
      { name: 'jiraQuery', node: jiraQuery },
    ];
  },

  pmPlugins() {
    return [
      {
        name: 'inlineJira',
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
          const node = state.schema.nodes.jiraQuery.create();
          return insert(node);
        },
      },
    ],
  },
} as EditorPlugin;
