// @flow

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';
import GlobalNavigation from '@atlaskit/global-navigation-next';
import { JiraSoftwareWordmark, JiraSoftwareIcon } from '@atlaskit/logo';
import StarFilledIcon from '@atlaskit/icon/glyph/star-filled';
import ShipIcon from '@atlaskit/icon/glyph/ship';
import { colors } from '@atlaskit/theme';

export const WrappedLink = ({
  href,
  children,
  className,
  innerRef,
  dataset,
  onClick,
}: *) => {
  return (
    <Link
      className={className}
      to={href}
      onClick={onClick}
      innerRef={innerRef}
      {...dataset}
    >
      {children}
    </Link>
  );
};

const DropdownLink = props => {
  return (
    <DropdownItem
      linkComponent={({ className, children, href, onClick }) => (
        <Link className={className} to={href} onClick={onClick}>
          {children}
        </Link>
      )}
      onClick={() => console.log('clicked')}
      {...props}
    />
  );
};

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

const ProjectsContent = ({ closeDropdown }: any) => (
  <Fragment>
    <DropdownItemGroup title="Favourite Projects">
      <DropdownLink
        href="/projects/endeavour"
        elemBefore={<ShipIcon />}
        elemAfter={<StarFilledIcon primaryColor={colors.Y300} />}
        onClick={closeDropdown}
      >
        Endeavour
      </DropdownLink>
    </DropdownItemGroup>
    <DropdownItemGroup title="Recent Projects">
      <DropdownLink
        href="/projects/endeavour"
        elemBefore={<ShipIcon />}
        elemAfter={<StarFilledIcon primaryColor={colors.Y300} />}
        onClick={closeDropdown}
      >
        Endeavour
      </DropdownLink>
    </DropdownItemGroup>
    <hr />
    <DropdownLink href="/projects" onClick={closeDropdown}>
      View all projects
    </DropdownLink>
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

export default class WrappedGlobalNavigation extends React.Component<
  {},
  ExampleState,
> {
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
        }}
        notifications={{}}
        settings={{
          isOpen: this.state.isSettingsOpen,
          onClose: this.onSettingsClose,
          onClick: this.onSettingsClick,
          drawerContent: () => <div>settings</div>,
        }}
        primaryItems={[
          { id: 'home', text: 'Home', href: '/', component: WrappedLink },
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
