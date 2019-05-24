import React, { Fragment } from 'react';
import { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';
import { JiraSoftwareIcon, JiraSoftwareWordmark } from '@atlaskit/logo';
import GlobalNavigation from '../src';

const HelpContent = () => (
  <Fragment>
    <DropdownItemGroup>
      <DropdownItem>Help</DropdownItem>
    </DropdownItemGroup>
    <DropdownItemGroup>
      <DropdownItem>Me</DropdownItem>
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
        create={{
          onClick: () => console.log('Create clicked'),
          text: 'Create',
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
        }}
        notifications={{}}
        settings={{
          isOpen: this.state.isSettingsOpen,
          onClose: this.onSettingsClose,
          onClick: this.onSettingsClick,
          drawerContent: () => <div>settings</div>,
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
