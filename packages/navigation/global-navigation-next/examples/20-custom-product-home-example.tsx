import React from 'react';

import { DefaultAppSwitcher } from '../example-helpers/AppSwitcher';
import { DefaultCreate } from '../example-helpers/Create';
import { DefaultHelp } from '../example-helpers/Help';
import { mockEndpoints } from '../example-helpers/mock-atlassian-switcher-endpoints';
import {
  mockBuiltInNotifications,
  BuiltInNotifications,
} from '../example-helpers/Notifications';
import {
  bitbucketPrimaryItems,
  confluencePrimaryItems,
  jiraPrimaryItems,
  opsGeniePrimaryItems,
} from '../example-helpers/PrimaryItems';
import {
  BitbucketProductHome,
  ConfluenceProductHome,
  DefaultCustomProductHome,
  JiraProductHome,
  JiraServiceDeskProductHome,
  JiraSoftwareProductHome,
  OpsGenieProductHome,
} from '../example-helpers/ProductHome';
import { DefaultProfile } from '../example-helpers/Profile';
import { DefaultSearch } from '../example-helpers/Search';
import { DefaultSettings } from '../example-helpers/Settings';
import GlobalNavigation from '../src';

mockEndpoints('jira');
mockBuiltInNotifications();

const CustomProductHomeExample = () => (
  <div>
    <GlobalNavigation
      primaryItems={bitbucketPrimaryItems}
      renderAppSwitcher={DefaultAppSwitcher}
      renderCreate={DefaultCreate}
      renderHelp={DefaultHelp}
      renderNotifications={BuiltInNotifications}
      renderProductHome={BitbucketProductHome}
      renderProfile={DefaultProfile}
      renderSearch={DefaultSearch}
      renderSettings={DefaultSettings}
    />
    <br />
    <GlobalNavigation
      primaryItems={confluencePrimaryItems}
      renderAppSwitcher={DefaultAppSwitcher}
      renderCreate={DefaultCreate}
      renderHelp={DefaultHelp}
      renderNotifications={BuiltInNotifications}
      renderProductHome={ConfluenceProductHome}
      renderProfile={DefaultProfile}
      renderSearch={DefaultSearch}
      renderSettings={DefaultSettings}
    />
    <br />
    <GlobalNavigation
      primaryItems={jiraPrimaryItems}
      renderAppSwitcher={DefaultAppSwitcher}
      renderCreate={DefaultCreate}
      renderHelp={DefaultHelp}
      renderNotifications={BuiltInNotifications}
      renderProductHome={JiraProductHome}
      renderProfile={DefaultProfile}
      renderSearch={DefaultSearch}
      renderSettings={DefaultSettings}
    />
    <br />
    <GlobalNavigation
      primaryItems={jiraPrimaryItems}
      renderAppSwitcher={DefaultAppSwitcher}
      renderCreate={DefaultCreate}
      renderHelp={DefaultHelp}
      renderNotifications={BuiltInNotifications}
      renderProductHome={JiraServiceDeskProductHome}
      renderProfile={DefaultProfile}
      renderSearch={DefaultSearch}
      renderSettings={DefaultSettings}
    />
    <br />
    <GlobalNavigation
      primaryItems={jiraPrimaryItems}
      renderAppSwitcher={DefaultAppSwitcher}
      renderCreate={DefaultCreate}
      renderHelp={DefaultHelp}
      renderNotifications={BuiltInNotifications}
      renderProductHome={JiraSoftwareProductHome}
      renderProfile={DefaultProfile}
      renderSearch={DefaultSearch}
      renderSettings={DefaultSettings}
    />
    <br />
    <GlobalNavigation
      primaryItems={opsGeniePrimaryItems}
      renderAppSwitcher={DefaultAppSwitcher}
      renderCreate={DefaultCreate}
      renderHelp={DefaultHelp}
      renderNotifications={BuiltInNotifications}
      renderProductHome={OpsGenieProductHome}
      renderProfile={DefaultProfile}
      renderSearch={DefaultSearch}
      renderSettings={DefaultSettings}
    />
    <br />
    <GlobalNavigation
      primaryItems={jiraPrimaryItems}
      renderAppSwitcher={DefaultAppSwitcher}
      renderCreate={DefaultCreate}
      renderHelp={DefaultHelp}
      renderNotifications={BuiltInNotifications}
      renderProductHome={DefaultCustomProductHome}
      renderProfile={DefaultProfile}
      renderSearch={DefaultSearch}
      renderSettings={DefaultSettings}
    />
  </div>
);

export default CustomProductHomeExample;
