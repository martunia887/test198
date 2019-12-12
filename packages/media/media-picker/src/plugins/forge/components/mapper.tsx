import * as React from 'react';

import { ForgeViewType } from '../types';
import { JsonLdCollection } from '../types/types-json-ld';
import { SelectedItem } from '../../../popup/domain';
import { BricksView } from '../../views/bricks';
import { BrowserView } from '../../views/browser/browser';

export interface ForgeViewMapperProps {
  view: ForgeViewType;
  items: JsonLdCollection;
  iconUrl: string;
  selectedItems: SelectedItem[];
  onUpdateItems: () => void;
  onFileClick: (id: string) => void;
  name: string;
}
export const ForgeViewMapper = ({
  view,
  items,
  iconUrl,
  onUpdateItems,
  selectedItems,
  onFileClick,
  name,
}: ForgeViewMapperProps) => {
  const viewProps = {
    selectedItems,
    onFileClick,
    pluginName: name,
  };
  if (view === 'bricks') {
    return (
      <BricksView
        items={items.data.map(
          ({ url, image: { width, height, url: src } }) => ({
            id: url,
            dimensions: { width, height },
            dataURI: src,
            name,
          }),
        )}
        {...viewProps}
      />
    );
  } else if (view === 'folders') {
    return (
      <BrowserView
        items={items}
        iconUrl={iconUrl}
        onFolderClick={() => {}}
        onAuthSucceeded={onUpdateItems}
        onAuthFailed={(err: Error) => console.error(err)}
        {...viewProps}
      />
    );
  }
  return null;
};
