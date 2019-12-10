import * as React from 'react';
import { useMemo } from 'react';
import { Action, Dispatch, Store } from 'redux';
import { State } from '../domain';
import { getPluginsFullfilled, getPluginsFailed } from '../actions';
import { isGetPluginsAction } from '../actions/getPlugins';
import ImageIcon from '@atlaskit/icon/glyph/image';
import { MediaPickerPlugin } from '../../domain/plugin';
import {
  ForgeView,
  ForgeClient,
  ForgeExtension,
} from '../../../example-helpers/forge';

const BASE_URL = 'https://api-private.stg.atlassian.com';
const GRAPHQL_PATH = '/graphql';
const EXTENSIONS_ARI =
  'ari:cloud:jira::site/adabbd0c-91c5-4229-9eb2-9915aa3abe49';

const PLUGINS = `
    id
    properties
`;
const PLUGINS_QUERY = `
    query get_extensions {
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
      operationName: 'get_extensions',
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
        (extension: any) => !!extension.properties.picker,
      );
      const pluginsForMediaPicker = pluginsAvailable.map(
        transformForgeDescriptorToPlugin,
      );
      dispatch(getPluginsFullfilled(pluginsForMediaPicker));
    })
    .catch(err => {
      console.error(err);
      dispatch(getPluginsFailed());
    });
};

export const transformForgeDescriptorToPlugin = ({
  id,
  key,
  properties: { picker },
}: ForgeExtension): MediaPickerPlugin => ({
  name: picker.name,
  icon: <ImageIcon label="image-icon" />,
  render: (actions, selectedItems) => {
    return (
      <ForgeView
        actions={actions}
        selectedItems={selectedItems}
        extensionOpts={{
          id,
          name: picker.name,
          view: picker.view,
          type: picker.dataSource,
        }}
      />
    );
  },
});
