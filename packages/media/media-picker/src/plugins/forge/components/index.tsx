import * as React from 'react';
import { useEffect, useState, useMemo, useCallback } from 'react';
import * as debounce from 'lodash.debounce';

import { ForgeViewProps } from '../types';
import { ForgeClient } from '../client';
import {
  JsonLdCollection,
  JsonLdCollectionEmpty,
} from '../types/types-json-ld';
import { ForgeViewMapper } from './mapper';
import { PluginHeader } from './header';
import {
  PluginWrapper,
  PluginContentContainer as PluginContentView,
} from './styled';
import { PluginLoadingView } from './loading';
import { PluginErrorView } from './error';
import { getMetadata } from '../utils';

export const ForgeView = ({
  extensionOpts: { type, name, id, view, iconUrl },
  actions,
  selectedItems,
}: ForgeViewProps) => {
  console.log({ name, view, type });
  const client = useMemo(() => new ForgeClient(id), [id]);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>();
  const [error, setError] = useState<Error>();
  const [items, setItems] = useState<JsonLdCollection>(JsonLdCollectionEmpty);

  const onUpdateItems = useCallback(
    debounce(async (query: string, folderId?: string) => {
      try {
        setError(undefined);
        setLoading(true);
        setItems(await client.invoke(type, { query, folderId }));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }, 1000),
    [name],
  );
  const onQueryChange: React.FormEventHandler<HTMLInputElement> = useCallback(
    evt => {
      setQuery(evt.currentTarget.value);
      onUpdateItems(query);
    },
    [onUpdateItems, query],
  );
  const onClick = useCallback(
    (id: string) => () => {
      const resource = items.data.find(r => r.url === id);
      if (resource) {
        if (resource['@type'] === 'Collection') {
          onUpdateItems(undefined, resource['@id']);
        } else {
          const metadata = getMetadata(id, resource);
          actions.fileClick(metadata, name);
        }
      }
    },
    [items.data, onUpdateItems, actions, name],
  );
  const onFileClick = useCallback((id: string) => onClick(id)(), [onClick]);

  useEffect(() => {
    onUpdateItems(query);
  }, [onUpdateItems, query, id]);

  return (
    <PluginWrapper>
      <PluginHeader
        name={name}
        loading={loading}
        error={error}
        totalImages={items.data && items.data.length}
        onQueryChange={onQueryChange}
        query={query}
      />
      {loading ? (
        <PluginLoadingView />
      ) : error ? (
        <PluginErrorView error={error} onRetry={onUpdateItems} />
      ) : (
        <PluginContentView>
          <ForgeViewMapper
            view={view}
            items={items}
            iconUrl={iconUrl}
            selectedItems={selectedItems}
            onUpdateItems={onUpdateItems}
            onFileClick={onFileClick}
            onFolderClick={onFileClick}
            name={name}
          />
        </PluginContentView>
      )}
    </PluginWrapper>
  );
};

export { ForgeIcon } from './icon';
