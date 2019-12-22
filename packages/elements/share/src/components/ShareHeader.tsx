import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FormHeader } from '@atlaskit/form';

import { messages } from '../i18n';

export type Props = {
  title?: React.ReactNode;
};

export const ShareHeader: React.StatelessComponent<Props> = ({ title }) => (
  <FormHeader
    title={
      title === undefined ? <FormattedMessage {...messages.formTitle} /> : title
    }
  />
);
