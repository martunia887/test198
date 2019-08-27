import { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';
import React, { Fragment } from 'react';

import { DefaultAppSwitcher } from '../example-helpers/AppSwitcher';
import { DefaultCreate } from '../example-helpers/Create';
import { DefaultHelp } from '../example-helpers/Help';
import { mockEndpoints } from '../example-helpers/mock-atlassian-switcher-endpoints';
import { JiraSoftwareHome } from '../example-helpers/ProductHome';
import { AnonymousProfile } from '../example-helpers/Profile';
import { DefaultSearch } from '../example-helpers/Search';
import GlobalNavigation from '../src';

mockEndpoints('jira');

const ProjectsContent = () => (
  <Fragment>
    <DropdownItemGroup title="Favourite Projects">
      <DropdownItem>Mobile Research</DropdownItem>
      <DropdownItem>IT Services</DropdownItem>
    </DropdownItemGroup>
    <DropdownItemGroup title="Recent Projects">
      <DropdownItem>Engineering Leadership</DropdownItem>
      <DropdownItem>BAU</DropdownItem>
      <DropdownItem>Hardware Support</DropdownItem>
      <DropdownItem>New Features</DropdownItem>
      <DropdownItem>SAS</DropdownItem>
    </DropdownItemGroup>
  </Fragment>
);

const IssuesContent = () => (
  <Fragment>
    <DropdownItemGroup title="Recent Issues">
      <DropdownItem>Issue One</DropdownItem>
      <DropdownItem>Issue Two</DropdownItem>
    </DropdownItemGroup>
    <DropdownItemGroup>
      <DropdownItem>View all recent issues</DropdownItem>
    </DropdownItemGroup>
    <DropdownItemGroup title="Filters">
      <DropdownItem>Filter One</DropdownItem>
      <DropdownItem>Filter Two</DropdownItem>
    </DropdownItemGroup>
  </Fragment>
);

const DashboardsContent = () => (
  <Fragment>
    <DropdownItemGroup>
      <DropdownItem>System Dashboard</DropdownItem>
    </DropdownItemGroup>
    <DropdownItemGroup>
      <DropdownItem>View all dashboards</DropdownItem>
    </DropdownItemGroup>
  </Fragment>
);

const primaryItems = [
  {
    id: 'home',
    text: 'Home',
    href: '#',
  },
  {
    dropdownContent: ProjectsContent,
    id: 'projects',
    text: 'Projects',
    onClick: (...args: any[]) => {
      console.log('Projects click', ...args);
    },
  },
  {
    dropdownContent: IssuesContent,
    id: 'issues',
    text: 'Issues & Filters',
    onClick: (...args: any[]) => {
      console.log('Issues click', ...args);
    },
  },
  {
    dropdownContent: DashboardsContent,
    id: 'dashboards',
    text: 'Dashboards',
    onClick: (...args: any[]) => {
      console.log('Dashboards click', ...args);
    },
  },
];

const BaseExample = () => (
  <GlobalNavigation
    primaryItems={primaryItems}
    renderAppSwitcher={DefaultAppSwitcher}
    renderCreate={DefaultCreate}
    renderHelp={DefaultHelp}
    renderProductHome={JiraSoftwareHome}
    renderProfile={AnonymousProfile}
    renderSearch={DefaultSearch}
  />
);

export default BaseExample;
