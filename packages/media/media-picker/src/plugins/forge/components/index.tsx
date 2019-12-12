import * as React from 'react';
import { useEffect, useState, useMemo, useCallback } from 'react';
import FieldText from '@atlaskit/field-text';
import Spinner from '@atlaskit/spinner';
import * as debounce from 'lodash.debounce';

import { ForgeViewProps } from '../types';
import { ForgeClient } from '../client';
import { PluginWrapper, PluginHeader, PluginContentContainer } from './styled';
import {
  JsonLdCollection,
  JsonLdCollectionEmpty,
} from '../types/types-json-ld';
import { SpinnerWrapper } from '../../views/styled';
import { ForgeViewMapper } from './mapper';
import { getMetadata } from '../utils';

const contentLoading = (
  <SpinnerWrapper>
    <Spinner size="medium" />
  </SpinnerWrapper>
);
export const ForgeView = ({
  extensionOpts: { type, name, id, view, iconUrl },
  actions,
  selectedItems,
}: ForgeViewProps) => {
  const client = useMemo(() => new ForgeClient(id), [id]);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>();
  const [items, setItems] = useState<JsonLdCollection>(JsonLdCollectionEmpty);

  const onUpdateItems = useCallback(
    debounce((query: string) => {
      setLoading(true);
      client.invoke(type, { query }).then(response => {
        setItems(response);
        setLoading(false);
      });
    }, 300),
    [query, name],
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
        const metadata = getMetadata(id, resource);
        actions.fileClick(metadata, name);
      }
    },
    [actions, name, items],
  );
  const onFileClick = useCallback((id: string) => onClick(id)(), [onClick]);

  useEffect(() => {
    onUpdateItems(query);
  }, [onUpdateItems, query, id]);

  const totalImages = items.data && items.data.length;
  const header = (
    <PluginHeader>
      <h3>
        {name} {!loading && totalImages > 0 && `• ${totalImages} images`}
      </h3>
      <FieldText
        placeholder={`Search ${name}...`}
        onChange={onQueryChange}
        value={query}
        isLabelHidden={true}
        shouldFitContainer={true}
      />
    </PluginHeader>
  );
  const content = loading ? (
    contentLoading
  ) : (
    <PluginContentContainer
      style={{ height: 'auto', overflowY: 'hidden' }}
      id="mediapicker-bricks-container"
    >
      <ForgeViewMapper
        view={view}
        items={items}
        iconUrl={iconUrl}
        selectedItems={selectedItems}
        onUpdateItems={onUpdateItems}
        onFileClick={onFileClick}
        name={name}
      />
    </PluginContentContainer>
  );
  return (
    <PluginWrapper>
      {header}
      {content}
    </PluginWrapper>
  );
};

export { ForgeIcon } from './icon';
