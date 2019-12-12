import * as React from 'react';
import { Action, Dispatch, Store } from 'redux';
import { State } from '../domain';
import { getPluginsFullfilled, getPluginsFailed } from '../actions';
import { isGetPluginsAction } from '../actions/getPlugins';
import { MediaPickerPlugin } from '../../domain/plugin';
import { ForgeExtension, ForgeView, ForgeIcon } from '../../plugins/forge';

const BASE_URL = 'https://api-private.stg.atlassian.com';
const GRAPHQL_PATH = '/graphql';
const EXTENSIONS_ARI =
  'ari:cloud:jira::site/adabbd0c-91c5-4229-9eb2-9915aa3abe49';
const EXTENSIONS_DENY_LIST = [
  'ari:cloud:ecosystem::extension/4a4fa7a9-0700-4ea3-9c21-66e273901b71/3d349a02-3be3-4b90-bdeb-9032d26ab118/static/google-object-provider',
];

const PLUGINS = `
    id
    properties
`;
const PLUGINS_QUERY = `
    query {
        extensionContexts(contextIds: ["${EXTENSIONS_ARI}"]) {
            extensionsByType(type: "platform:objectProvider") {
                ${PLUGINS}
            } 
        }
    }
    `;

export const getPlugins = () => (store: Store<State>) => (
  next: Dispatch<Action>,
) => (action: Action) => {
  if (isGetPluginsAction(action)) {
    requestPlugins(store);
  }

  return next(action);
};

export const requestPlugins = (store: Store<State>): void => {
  const { dispatch } = store;
  const request = fetch(BASE_URL + GRAPHQL_PATH, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      query: PLUGINS_QUERY,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });

  request
    .then(response => response.json())
    .then(response => {
      const pluginsRawResponse = response.data.extensionContexts.shift();
      const pluginsAvailable: ForgeExtension[] = pluginsRawResponse.extensionsByType.filter(
        (extension: any) =>
          !!extension.properties.picker &&
          !EXTENSIONS_DENY_LIST.includes(extension.id),
      );
      const pluginsForMediaPicker = pluginsAvailable
        .map(transformForgeDescriptorToPlugin)
        .sort((b, a) => b.name.localeCompare(a.name));
      dispatch(getPluginsFullfilled(pluginsForMediaPicker));
    })
    .catch(err => {
      dispatch(getPluginsFailed());
    });
};

export const transformForgeDescriptorToPlugin = ({
  id,
  properties: {
    picker: { name, view, dataSource = 'search', iconUrl },
  },
}: ForgeExtension): MediaPickerPlugin => ({
  name: name,
  icon: <ForgeIcon iconUrl={iconUrl} />,
  render: (actions, selectedItems) => {
    return (
      <ForgeView
        key={id}
        actions={actions}
        selectedItems={selectedItems}
        extensionOpts={{
          id,
          name: name,
          view: view,
          type: dataSource,
          iconUrl,
        }}
      />
    );
  },
});
