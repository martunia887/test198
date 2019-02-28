import * as React from 'react';
import { JiraIcon } from '@atlaskit/logo';
import { EditorPlugin } from '../../types';
import createInlineJiraPlugin from './pm-plugins/main';
import { jiraQuery, jiraIssue, jiraIssueSelect } from '@atlaskit/adf-schema';

const CreateJiraIssueTitle = 'Create Jira issue';
const JQLTitle = 'JQL';

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
        title: CreateJiraIssueTitle,
        priority: 600,
        icon: () => <JiraIcon size="small" label={CreateJiraIssueTitle} />,
        action(insert, state) {
          const node = state.schema.nodes.jiraQuery.create();
          return insert(node);
        },
      },
      {
        title: JQLTitle,
        priority: 700,
        icon: () => <JiraIcon size="small" label={JQLTitle} />,
        action(insert, state) {
          // const mark: Mark = state.schema.marks.jqlQuery;
          // const jiraText = state.schema.text('ihavewidget', [mark]);
          // console.log(jiraText);
          // const tr = insert(jiraText);

          return state.tr;
        },
      },
    ],
  },
} as EditorPlugin;
