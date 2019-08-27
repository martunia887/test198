import React from 'react';

import { DefaultAppSwitcher } from '../example-helpers/AppSwitcher';
import { DefaultCreate } from '../example-helpers/Create';
import { DefaultHelp } from '../example-helpers/Help';
import { mockEndpoints } from '../example-helpers/mock-atlassian-switcher-endpoints';
import { defaultPrimaryItems } from '../example-helpers/PrimaryItems';
import { DefaultProductHome } from '../example-helpers/ProductHome';
import { AnonymousProfile } from '../example-helpers/Profile';
import { DefaultSearch } from '../example-helpers/Search';
import GlobalNavigation from '../src';

mockEndpoints('jira');

const AnonymousExample = () => (
  <GlobalNavigation
    primaryItems={defaultPrimaryItems}
    renderAppSwitcher={DefaultAppSwitcher}
    renderCreate={DefaultCreate}
    renderHelp={DefaultHelp}
    renderProductHome={DefaultProductHome}
    renderProfile={AnonymousProfile}
    renderSearch={DefaultSearch}
  />
);

export default AnonymousExample;
