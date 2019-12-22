import * as React from 'react';
import Tooltip from '@atlaskit/tooltip';
import { NoAccessWarning } from '../util/i18n';

type Props = {
  name: string;
  children: React.ReactNode;
};

export const NoAccessTooltip = ({ name, children }: Props) => (
  <NoAccessWarning name={name}>
    {text => (
      <Tooltip content={text} position="right">
        {children}
      </Tooltip>
    )}
  </NoAccessWarning>
);
