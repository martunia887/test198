import React from 'react';

import { DefaultAppSwitcher } from '../example-helpers/AppSwitcher';
import { DefaultCreate } from '../example-helpers/Create';
import { DefaultHelp } from '../example-helpers/Help';
import { mockEndpoints } from '../example-helpers/mock-atlassian-switcher-endpoints';
import {
  mockBuiltInNotifications,
  BuiltInNotifications,
} from '../example-helpers/Notifications';
import { defaultPrimaryItems } from '../example-helpers/PrimaryItems';
import { DefaultProductHome } from '../example-helpers/ProductHome';
import { DefaultProfile } from '../example-helpers/Profile';
import { DefaultSearch } from '../example-helpers/Search';
import { DefaultSettings } from '../example-helpers/Settings';
import GlobalNavigation from '../src';

mockEndpoints('jira');
mockBuiltInNotifications();

const AuthenticatedExample = () => (
  <GlobalNavigation
    primaryItems={defaultPrimaryItems}
    renderAppSwitcher={DefaultAppSwitcher}
    renderCreate={DefaultCreate}
    renderHelp={DefaultHelp}
    renderNotifications={BuiltInNotifications}
    renderProductHome={DefaultProductHome}
    renderProfile={DefaultProfile}
    renderSearch={DefaultSearch}
    renderSettings={DefaultSettings}
  />
);

export default AuthenticatedExample;
