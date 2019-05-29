import React, { Fragment } from 'react';
import AtlassianSwitcher from '@atlaskit/atlassian-switcher';
import Avatar from '@atlaskit/avatar';
import { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';
import { JiraSoftwareIcon, JiraSoftwareWordmark } from '@atlaskit/logo';
import GlobalNavigation from '../src';
import { IntlProvider } from 'react-intl';

import { mockEndpoints } from './helpers/mock-atlassian-switcher-endpoints';
import { mockNotificationsEndpoint } from './helpers/mock-notifications-endpoint';
import { getAvatarUrl } from './helpers/avatar-data-url';

const CLOUD_ID = 'some-cloud-id';
const FABRIC_NOTIFICATION_LOG_URL = '/gateway/api/notification-log/';

mockEndpoints('jira');
mockNotificationsEndpoint(
  `/gateway/api/notification-log/api/2/notifications/count/unseen?cloudId=${CLOUD_ID}`,
  3,
);

const ProfileContent = () => (
  <Fragment>
    <DropdownItemGroup title="JimJim">
      <DropdownItem>Profile</DropdownItem>
      <DropdownItem>Give feedback</DropdownItem>
      <DropdownItem>Personal settings</DropdownItem>
      <DropdownItem>My Reminders</DropdownItem>
      <DropdownItem>Log out</DropdownItem>
    </DropdownItemGroup>
  </Fragment>
);

const HelpContent = () => (
  <Fragment>
    <DropdownItemGroup title="Help">
      <DropdownItem>Atlassian Documentation</DropdownItem>
      <DropdownItem>Atlassian Community</DropdownItem>
      <DropdownItem>What's New</DropdownItem>
      <DropdownItem>Get Jira Mobile</DropdownItem>
      <DropdownItem>Keyboard shortcuts</DropdownItem>
      <DropdownItem>About Jira</DropdownItem>
    </DropdownItemGroup>
    <DropdownItemGroup title="Legal">
      <DropdownItem>Terms of use</DropdownItem>
      <DropdownItem>Privacy Policy</DropdownItem>
    </DropdownItemGroup>
  </Fragment>
);

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

const WrappedSwitcher = () => {
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

interface ExampleState {
  isHelpOpen: boolean;
  isSettingsOpen: boolean;
}

export default class BaseExample extends React.Component<{}, ExampleState> {
  state = {
    isHelpOpen: false,
    isSettingsOpen: false,
  };

  onHelpClick = () => {
    this.setState(state => ({
      isHelpOpen: !state.isHelpOpen,
    }));
  };

  onHelpClose = () => {
    this.setState({
      isHelpOpen: false,
    });
  };

  onNotificationsClick = () => {
    console.log('notifications click');

    // Notification URL is unreachable from the examples.
    // Hence setting it to root
    // Wait for the drawer to open and mount the iframe.
    setTimeout(() => {
      const iframes: NodeListOf<HTMLIFrameElement> = document.querySelectorAll(
        'iFrame[title="Notifications"]',
      );
      iframes.forEach(iframe => {
        iframe.src = '/';
        iframe.srcdoc = 'notifications drawer iframe';
      });
    }, 50);
  };

  onSettingsClose = () => {
    this.setState({
      isSettingsOpen: false,
    });
  };

  onSettingsClick = () => {
    this.setState(state => ({
      isSettingsOpen: !state.isSettingsOpen,
    }));
  };

  render() {
    return (
      <GlobalNavigation
        appSwitcher={{
          drawerContent: WrappedSwitcher,
          tooltip: 'Switch to...',
        }}
        // appSwitcherComponent={undefined} // no switcher behaviour
        create={{
          onClick: () => console.log('Create clicked'),
          text: 'Create',
        }}
        search={{
          drawerContent: () => <div>quick search</div>,
          text: 'Search',
        }}
        product={{
          icon: JiraSoftwareIcon,
          wordmark: JiraSoftwareWordmark,
        }}
        help={{
          dropdownContent: HelpContent,
          isOpen: this.state.isHelpOpen,
          onClose: this.onHelpClose,
          onClick: this.onHelpClick,
          tooltip: 'Help',
        }}
        notifications={{
          badge: {
            type: 'builtin',
            fabricNotificationLogUrl: FABRIC_NOTIFICATION_LOG_URL,
            cloudId: CLOUD_ID,
          },
          // badge: {
          //   type: 'provided',
          //   count: 3,
          // },
          drawerContent: 'builtin',
          // drawerContent: () => <div>custom drawer content</div>,
          locale: 'en',
          onClick: this.onNotificationsClick,
          product: 'jira',
          tooltip: 'Notifications',
        }}
        settings={{
          isOpen: this.state.isSettingsOpen,
          onClose: this.onSettingsClose,
          onClick: this.onSettingsClick,
          drawerContent: () => <div>settings</div>,
          tooltip: 'Settings',
        }}
        // profile={{
        //   href: '/login',
        //   text: 'Custom sign in text',
        // }}
        profile={{
          text: <Avatar src={getAvatarUrl()} />,
          dropdownContent: ProfileContent,
          tooltip: 'Your profile and settings',
        }}
        primaryItems={[
          { id: 'home', text: 'Home', href: '#' },
          {
            dropdownContent: ProjectsContent,
            id: 'projects',
            text: 'Projects',
            onClick: () => {
              console.log('Projects clicked');
            },
          },
          {
            dropdownContent: IssuesContent,
            id: 'issues',
            text: 'Issues & Filters',
            onClick: () => {
              console.log('Issues clicked');
            },
          },
          {
            dropdownContent: DashboardsContent,
            id: 'dashboards',
            text: 'Dashboards',
            onClick: () => {
              console.log('Dashboards clicked');
            },
          },
        ]}
      />
    );
  }
}
