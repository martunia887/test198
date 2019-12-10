import * as React from 'react';
import { useEffect, useState, useMemo, useCallback } from 'react';
import FieldText from '@atlaskit/field-text';

import { BricksView, BrickItem } from '../../src/plugins/bricksPluginView';
``;
import { ForgeViewProps } from './types';
import { ForgeClient } from './client';
import { PluginWrapper, PluginHeader } from './styled';

export const ForgeView = ({
  extensionOpts: { type, name, id },
  actions,
  selectedItems,
}: ForgeViewProps) => {
  const client = useMemo(() => new ForgeClient(id), [id]);
  const [query, setQuery] = useState<string>('');
  const [items, setItems] = useState<any[]>([]);

  const onUpdateItems = useCallback(async () => {
    const response = await client.invoke(type, { query });
    setItems(response.data);
  }, [client, type, query]);
  const onQueryChange = useCallback(
    (evt: React.FormEvent<HTMLInputElement>) => {
      setQuery(evt.currentTarget.value);
      onUpdateItems();
    },
    [onUpdateItems],
  );
  const onCardClick = useCallback(
    (id: string) => () => {
      const item = items.find(item => item.url === id);
      if (item) {
        actions.fileClick(
          {
            id,
            metadata: {
              src: item.image.url,
              srcFull: item.image.url,
            },
          },
          name,
        );
      }
    },
    [actions, name, items],
  );
  const onFileClick = useCallback((item: BrickItem) => onCardClick(item.id)(), [
    onCardClick,
  ]);

  const view = useMemo(() => {
    return (
      <BricksView
        items={items.map((item: any) => ({
          id: item.url,
          dimensions: { width: item.image.width, height: item.image.height },
          dataURI: item.image.url,
          name: name,
        }))}
        selectedItems={selectedItems}
        onFileClick={onFileClick}
        pluginName={name}
      />
    );
  }, [name, items, onFileClick, selectedItems]);

  useEffect(() => {
    onUpdateItems();
  }, [onUpdateItems]);

  return (
    <PluginWrapper>
      <PluginHeader>
        <h2>{name} (Forge)</h2>
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
