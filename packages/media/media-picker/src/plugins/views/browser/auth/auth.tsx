import * as React from 'react';
import { useCallback } from 'react';
import AkButton from '@atlaskit/button';
import { FormattedMessage } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import { auth } from '@atlaskit/outbound-auth-flow-client';

import {
  ButtonWrapper,
  ConnectWrapper,
  IconWrapper,
  TextDescription,
  Title,
} from './styled';
import { JsonLdMetaAuth } from '../../../forge/types/types-json-ld';

export interface BrowserAuthViewProps {
  name: string;
  iconUrl: string;
  auth: JsonLdMetaAuth[];
  onAuthSucceeded: () => void;
  onAuthFailed: (err: Error) => void;
}

export const BrowserAuthView = ({
  iconUrl,
  auth: services,
  name,
  onAuthSucceeded,
  onAuthFailed,
}: BrowserAuthViewProps) => {
  const authUrl = services[0].url;
  const onClick = useCallback(() => {
    console.log('clicked auth, going to', authUrl);
    auth(authUrl)
      .then(onAuthSucceeded)
      .catch(onAuthFailed);
  }, [authUrl, onAuthFailed, onAuthSucceeded]);
  return (
    <ConnectWrapper>
      <Title>
        <FormattedMessage {...messages.upload_file_from} values={{ name }} />
      </Title>
      <IconWrapper src={iconUrl} />
      <ButtonWrapper>
        <AkButton appearance="primary" className="connectBtn" onClick={onClick}>
          <FormattedMessage {...messages.connect_to} values={{ name }} />
        </AkButton>
      </ButtonWrapper>
      <TextDescription>
        <FormattedMessage
          {...messages.connect_account_description}
          values={{ name }}
        />
      </TextDescription>
    </ConnectWrapper>
  );
};
