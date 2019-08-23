import AtlassianSwitcher from '@atlaskit/atlassian-switcher';
import React from 'react';
import { IntlProvider } from 'react-intl';

import { AppSwitcher } from '../src';

const DrawerContent = () => {
  return (
    <IntlProvider>
      <AtlassianSwitcher
        product="jira"
        cloudId="some-cloud-id"
        triggerXFlow={() => undefined}
      />
    </IntlProvider>
  );
};

const onDrawerCloseComplete = () => {
  console.log('app switcher close completed');
};

export const DefaultAppSwitcher = () => (
  <AppSwitcher
    drawerContent={DrawerContent}
    onDrawerCloseComplete={onDrawerCloseComplete}
    tooltip="Switch to..."
  />
);
