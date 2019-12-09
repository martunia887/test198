import * as React from 'react';
import { useEffect, useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import FieldText from '@atlaskit/field-text';

import { PluginActions } from '../src/domain/plugin';
import { SelectedItem } from '../src/popup/domain';
import { BricksView } from '../src/plugins/bricksPluginView';

export const PluginWrapper = styled.div`
  overflow: auto;
`;
export const PluginHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  label {
    display: none;
  }

  > div {
    flex: initial;
  }
`;

const API_ENDPOINT = 'https://api-private.stg.atlassian.com';
const API_PATH = '/graphql';
const QUERY_ARI = 'ari:cloud:jira::site/adabbd0c-91c5-4229-9eb2-9915aa3abe49';
const QUERY_INVOKE = `
mutation invoke($input: InvokeExtensionInput!) {
    invokeExtension(input: $input) {
      statusCode
      success
      message
      response {
        body
      }
      auth: externalAuth {
        key
        displayName
        url
      }
    }
  }`;
export type ForgeInvokeType = 'search' | 'lookup' | 'pattern';
export type ForgeViewType = 'bricks' | 'directory';
export interface ForgeViewProps {
  client: ForgeClient;
  actions: PluginActions;
  selectedItems: SelectedItem[];
  extensionOpts: {
    id: string;
    view: string;
    type: ForgeInvokeType;
    name: string;
  };
}
export interface ForgeInvokeParams {
  query?: string;
  resourceUrl?: string;
}
export interface ForgeInvokeResponse {
  data: {
    invokeExtension: {
      response: {
        body: any;
      };
    };
  };
}

export const ForgeView = ({
  client,
  extensionOpts,
  actions,
  selectedItems,
}: ForgeViewProps) => {
  const [query, setQuery] = useState<string>('');
  const [items, setItems] = useState<any[]>([]);

  const onUpdateItems = useCallback(async () => {
    const response = await client.invoke(extensionOpts.type, { query });
    setItems(response.data);
  }, [client, extensionOpts.type, query]);

  const onQueryChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setQuery(evt.currentTarget.value);
    onUpdateItems();
  };

  const view = useMemo(() => {
    console.log('re-rendering');
    console.log({ items });
    return (
      <BricksView
        items={items.map((item: any) => ({
          id: item.url,
          dimensions: { width: item.image.width, height: item.image.height },
          dataURI: item.image.url,
          name: extensionOpts.name,
        }))}
        selectedItems={selectedItems}
        onFileClick={() => {}}
        pluginName={extensionOpts.name}
      />
    );
  }, [extensionOpts.name, items, selectedItems]);

  useEffect(() => {
    onUpdateItems();
  }, [onUpdateItems, query]);

  return (
    <PluginWrapper>
      <PluginHeader>
        <h2>{extensionOpts.name} (Forge)</h2>
        <FieldText
          placeholder="Search..."
          onChange={onQueryChange}
          value={query}
        />
      </PluginHeader>
      {view}
    </PluginWrapper>
  );
};

export class ForgeClient {
  constructor(private extensionId: string) {}

  public async invoke(type: ForgeInvokeType, params: ForgeInvokeParams) {
    const response = await fetch(API_ENDPOINT + API_PATH, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        query: QUERY_INVOKE,
        variables: {
          input: {
            contextIds: [QUERY_ARI],
            extensionId: this.extensionId,
            payload: {
              type,
              resourceUrl: params.resourceUrl,
              query: params.query,
            },
          },
        },
      }),
      headers: {
        'content-type': 'application/json',
      },
    });
    const responseAsJson = (await response.json()) as ForgeInvokeResponse;
    console.log({ responseAsJson });
    return responseAsJson.data.invokeExtension.response.body;
  }
}
