import { OptionData } from '@atlaskit/user-picker';
import { userPickerData } from '@atlaskit/util-data-test';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import App from '../example-helpers/AppWithFlag';
import { ShareDialogContainer } from '../src';
import {
  Comment,
  ConfigResponse,
  Content,
  Flag,
  KeysOfType,
  MetaData,
  OriginTracing,
  ShareClient,
  User,
} from '../src/types';

type UserData = {
  avatarUrl?: string;
  id: string;
  includesYou?: boolean;
  fixed?: boolean;
  lozenge?: string;
  memberCount?: number;
  name: string;
  publicName?: string;
  type?: string;
};

const mockOriginTracing: OriginTracing = {
  id: 'id',
  addToUrl: (l: string) => `${l}&atlOrigin=mockAtlOrigin`,
  toAnalyticsAttributes: () => ({
    originIdGenerated: 'id',
    originProduct: 'product',
  }),
};

const loadUserOptions = (searchText?: string): OptionData[] => {
  if (!searchText) {
    return userPickerData;
  }

  return userPickerData
    .map((user: UserData) => ({
      ...user,
      type: user.type || 'user',
    }))
    .filter((user: UserData) => {
      const searchTextInLowerCase = searchText.toLowerCase();
      const propertyToMatch: (KeysOfType<UserData, string | undefined>)[] = [
        'id',
        'name',
        'publicName',
      ];

      return propertyToMatch.some(
        (property: KeysOfType<UserData, string | undefined>) => {
          const value = property && user[property];
          return !!(
            value && value.toLowerCase().includes(searchTextInLowerCase)
          );
        },
      );
    });
};

const client: ShareClient = {
  getConfig: () =>
    Promise.resolve<ConfigResponse>({
      mode: 'DOMAIN_BASED_INVITE',
      allowedDomains: ['atlassian.com'],
      allowComment: true,
    }),
  share: (
    _content: Content,
    _users: User[],
    _metaData: MetaData,
    _comment?: Comment,
  ) => {
    return new Promise(resolve => {
      setTimeout(
        () =>
          resolve({
            shareRequestId: 'c41e33e5-e622-4b38-80e9-a623c6e54cdd',
          }),
        3000,
      );
    });
  },
};

export default () => (
  <IntlProvider locale="en">
    <App>
      {(showFlags: (flags: Array<Flag>) => void) => (
        <ShareDialogContainer
          client={client}
          cloudId="12345-12345-12345-12345"
          loadUserOptions={loadUserOptions}
          originTracingFactory={() => mockOriginTracing}
          productId="confluence"
          shareAri="ari"
          shareContentType="page"
          shareLink={window.location.href}
          shareTitle="My Share"
          showFlags={showFlags}
          triggerButtonStyle="icon-with-text"
        />
      )}
    </App>
  </IntlProvider>
);
