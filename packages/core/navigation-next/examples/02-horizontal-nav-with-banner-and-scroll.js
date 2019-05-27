// @flow

import React, { Component, Fragment } from 'react';

/*
 * Routing and Server Side Rendering
 * Make sure you correctly configure your
 * application's routes to be compatible
 * with SSR. For instructions on how to
 * SSR with React Router, check out their docs:
 * https://reacttraining.com/react-router/web/guides/server-rendering
 */

import { Route, Switch } from 'react-router';
import { MemoryRouter } from 'react-router-dom';

import { Label } from '@atlaskit/field-base';
import { ToggleStateless } from '@atlaskit/toggle';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import Banner from '@atlaskit/banner';
import { layers } from '@atlaskit/theme';

// $FlowFixMe - ts module and relative import?
import BaseGlobalNavigationExample from '../../../navigation/global-navigation-next/examples/00-base-example';

import { LayoutManagerWithViewController, NavigationProvider } from '../src';

import { LinkItem, ProjectSwitcher } from './shared/components';
import RootViews from './shared/views/root';
import ContainerViews from './shared/views/container';

import {
  BacklogView,
  ProjectsView,
  DashboardsView,
  SearchIssuesView,
} from './shared/routes';

const BANNER_HEIGHT = 52;

const Icon = <WarningIcon label="Warning icon" secondaryColor="inherit" />;

const WarningBanner = ({ isOpen = true }: { isOpen: boolean }) => (
  <div
    style={{
      position: 'fixed',
      width: '100%',
      zIndex: layers.navigation(),
      height: BANNER_HEIGHT,
    }}
  >
    <Banner icon={Icon} isOpen={isOpen} appearance="warning">
      This is a warning banner
    </Banner>
  </div>
);

export default class App extends Component<
  {},
  {
    isBannerOpen: boolean,
  },
> {
  state = {
    isBannerOpen: false,
  };

  onBannerToggle = () =>
    this.setState(state => ({ isBannerOpen: !state.isBannerOpen }));

  render() {
    const { isBannerOpen } = this.state;

    const topOffset = isBannerOpen ? BANNER_HEIGHT : 0;

    return (
      <MemoryRouter>
        <NavigationProvider>
          <Fragment>
            <WarningBanner isOpen={isBannerOpen} />
            <LayoutManagerWithViewController
              customComponents={{ LinkItem, ProjectSwitcher }}
              experimental_flyoutOnHover
              experimental_alternateFlyoutBehaviour
              experimental_horizontalGlobalNav
              globalNavigation={BaseGlobalNavigationExample}
              topOffset={topOffset}
            >
              <div
                style={{
                  padding: 40,
                  height: 2000,
                  marginTop: isBannerOpen ? BANNER_HEIGHT : 0,
                }}
              >
                <RootViews />
                <ContainerViews />
                <Switch>
                  <Route path="/projects/:projectId" component={BacklogView} />
                  <Route path="/projects" component={ProjectsView} />
                  <Route path="/issues/search" component={SearchIssuesView} />
                  <Route path="/" component={DashboardsView} />
                </Switch>
                <Label label="Toggle banner" />
                <ToggleStateless
                  isChecked={isBannerOpen}
                  onChange={this.onBannerToggle}
                />
              </div>
            </LayoutManagerWithViewController>
          </Fragment>
        </NavigationProvider>
      </MemoryRouter>
    );
  }
}
