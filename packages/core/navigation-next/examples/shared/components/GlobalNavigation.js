// @flow

import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import { Link } from 'react-router-dom';
import AtlassianSwitcher from '@atlaskit/atlassian-switcher';
import { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';
import GlobalNavigation from '@atlaskit/global-navigation-next';
import { JiraSoftwareWordmark, JiraSoftwareIcon } from '@atlaskit/logo';
import Bug16Icon from '@atlaskit/icon-object/glyph/bug/16';
import Story16Icon from '@atlaskit/icon-object/glyph/story/16';
import StarFilledIcon from '@atlaskit/icon/glyph/star-filled';
import ShipIcon from '@atlaskit/icon/glyph/ship';
import { colors } from '@atlaskit/theme';

import { mockEndpoints } from './helpers/mock-atlassian-switcher-endpoints';

import BasicQuickSearch from './QuickSearch';

mockEndpoints('jira');

const IssueKey = ({ children }) => (
  <span css={{ color: colors.B400, marginRight: 8 }}>{children}</span>
);

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

const IssuesContent = ({ closeDropdown }: any) => (
  <Fragment>
    <DropdownItemGroup title="Recent Issues">
      <DropdownLink
        href="/issues/nav-1"
        elemBefore={<Story16Icon />}
        onClick={closeDropdown}
      >
        <IssueKey>NAV-1</IssueKey>Add quick search
      </DropdownLink>
      <DropdownLink
        href="/issues/nav-2"
        elemBefore={<Bug16Icon />}
        onClick={closeDropdown}
      >
        <IssueKey>NAV-2</IssueKey>Dont re-render 1000 times
      </DropdownLink>
    </DropdownItemGroup>
    <DropdownItemGroup>
      <DropdownLink href="/issues/recent" onClick={closeDropdown}>
        View all recent issues
      </DropdownLink>
    </DropdownItemGroup>
    <DropdownItemGroup title="Filters">
      <DropdownLink href="/filters/my-open-issues" onClick={closeDropdown}>
        My open issues
      </DropdownLink>
      <DropdownLink href="/filters/reported-by-me" onClick={closeDropdown}>
        Reported by me
      </DropdownLink>
    </DropdownItemGroup>
  </Fragment>
);

const DashboardsContent = ({ closeDropdown }: any) => (
  <Fragment>
    <DropdownLink href="/" onClick={closeDropdown}>
      System Dashboard
    </DropdownLink>
    <DropdownLink href="/" onClick={closeDropdown}>
      View all dashboards
    </DropdownLink>
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
        appSwitcherComponent={WrappedSwitcher}
        create={{
          onClick: () => console.log('Create clicked'),
          text: 'Create',
        }}
        search={{
          drawerContent: () => <BasicQuickSearch />,
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
