import * as React from 'react';
import { JiraIcon } from '@atlaskit/logo';
import SearchIcon from '@atlaskit/icon/glyph/search';
import { EditorPlugin } from '../../types';
import createInlineJiraPlugin from './pm-plugins/main';
import {
  jiraQuery,
  jqlQuery,
  jiraIssue,
  jiraIssueSelect,
} from '@atlaskit/adf-schema';

const CreateJiraIssueTitle = 'Create Jira issue';
const JQLTitle = 'JQL';

export default {
  nodes() {
    return [
      { name: 'jiraIssue', node: jiraIssue },
      { name: 'jiraIssueSelect', node: jiraIssueSelect },
      { name: 'jiraQuery', node: jiraQuery },
      { name: 'jqlQuery', node: jqlQuery },
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
    quickInsert: () => [
      {
        title: CreateJiraIssueTitle,
        priority: 600,
        icon: () => <JiraIcon size="small" label={CreateJiraIssueTitle} />,
        action(insert, state) {
          const node = state.schema.nodes.jiraQuery.create();
          return insert(node, { selectInlineNode: true });
        },
      },
      {
        title: JQLTitle,
        priority: 700,
        icon: () => <SearchIcon size="small" label={JQLTitle} />,
        action(insert, state) {
          const node = state.schema.nodes.jqlQuery.create();
          return insert(node);
        },
      },
    ],
  },
} as EditorPlugin;
