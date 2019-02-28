import * as React from 'react';
import { JiraIcon } from '@atlaskit/logo';
import { EditorPlugin } from '../../types';
import createInlineJiraPlugin from './pm-plugins/main';
import { jiraQuery, jiraIssue } from '@atlaskit/adf-schema';
import { Mark } from 'prosemirror-model';
import { pluginKey } from './pm-plugins/main';
import { Decoration } from 'prosemirror-view';

const title = 'Create Jira issue';

export default {
  marks() {
    return [{ name: 'jiraQuery', mark: jiraQuery }];
  },

  nodes() {
    return [{ name: 'jiraIssue', node: jiraIssue }];
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
          // const mark: Mark = state.schema.nodes.paragraph;
          const jiraText = state.schema.text('hello', []);
          console.log(jiraText);
          const tr = insert(jiraText);
          // TODO: figure out pos in tr

          tr.setMeta(pluginKey, {
            decorations: Decoration.widget(
              0,
              (view, getPos) => {
                const node = document.createElement('span');
                node.style.background = 'red';
                node.innerText = 'hello';
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
