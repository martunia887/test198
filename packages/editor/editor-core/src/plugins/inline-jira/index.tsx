import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { JiraIcon } from '@atlaskit/logo';
import { EditorPlugin } from '../../types';
import createInlineJiraPlugin from './pm-plugins/main';
import { jiraQuery, jiraIssue, jiraIssueSelect } from '@atlaskit/adf-schema';
import { Mark } from 'prosemirror-model';
import { pluginKey } from './pm-plugins/main';
import { Decoration } from 'prosemirror-view';
import { JiraCreateNode } from './nodeviews';

const title = 'Create Jira issue';

export default {
  marks() {
    return [{ name: 'jiraQuery', mark: jiraQuery }];
  },

  nodes() {
    return [
      { name: 'jiraIssue', node: jiraIssue },
      { name: 'jiraIssueSelect', node: jiraIssueSelect },
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
          const mark: Mark = state.schema.marks.jiraQuery;
          const jiraText = state.schema.text('ihavewidgert', [mark]);
          console.log(jiraText);
          const tr = insert(jiraText);
          // TODO: figure out pos in tr

          tr.setMeta(pluginKey, {
            decorations: Decoration.widget(
              1,
              (view, getPos) => {
                const node = document.createElement('span');
                ReactDOM.render(React.createElement(JiraCreateNode), node);
                return node;
              },
              {
                side: -1,
                key: 'jiraInsert',
              },
            ),
          });

          return tr;
        },
      },
    ],
  },
} as EditorPlugin;
