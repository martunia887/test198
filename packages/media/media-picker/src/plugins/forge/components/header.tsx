import * as React from 'react';

import FieldText from '@atlaskit/textfield';
import { PluginHeaderWrapper } from './styled';

export interface PluginHeaderProps {
  name: string;
  loading: boolean;
  error?: Error;
  totalImages: number;
  onQueryChange: React.FormEventHandler<HTMLInputElement>;
  query?: string;
}
export const PluginHeader = ({
  name,
  loading,
  error,
  totalImages,
  onQueryChange,
  query,
}: PluginHeaderProps) => {
  const isReady = !loading && !error;
  return (
    <PluginHeaderWrapper>
      <h3>
        {name} {isReady && `• ${totalImages} results`}
      </h3>
      {!error && (
        <FieldText
          placeholder={`Search...`}
          onChange={onQueryChange}
          value={query}
          width={420}
        />
      )}
    </PluginHeaderWrapper>
  );
};
