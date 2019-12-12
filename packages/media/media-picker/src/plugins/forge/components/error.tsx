import * as React from 'react';
import Button from '@atlaskit/button';
import WarningIcon from '@atlaskit/icon/glyph/warning';

import {
  PluginErrorContainer,
  PluginErrorDetails,
  PluginErrorText,
} from './styled';

export interface PluginErrorViewProps {
  error: Error;
  onRetry: () => void;
}

export const PluginErrorView = ({ error, onRetry }: PluginErrorViewProps) => {
  return (
    <PluginErrorContainer>
      <PluginErrorDetails>
        <WarningIcon label="warning" />
        <PluginErrorText>Oops! Something went wrong.</PluginErrorText>
      </PluginErrorDetails>
      <Button className="connectBtn" onClick={onRetry}>
        Try Again
      </Button>
    </PluginErrorContainer>
  );
};
