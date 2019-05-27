// @flow

import React, { Component } from 'react';

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

export default class App extends Component<{}> {
  render() {
    return (
      <MemoryRouter>
        <NavigationProvider>
          <LayoutManagerWithViewController
            customComponents={{ LinkItem, ProjectSwitcher }}
            experimental_flyoutOnHover
            experimental_alternateFlyoutBehaviour
            experimental_horizontalGlobalNav
            globalNavigation={BaseGlobalNavigationExample}
          >
            <div style={{ padding: 40 }}>
              <RootViews />
              <ContainerViews />
              <Switch>
                <Route path="/projects/:projectId" component={BacklogView} />
                <Route path="/projects" component={ProjectsView} />
                <Route path="/issues/search" component={SearchIssuesView} />
                <Route path="/" component={DashboardsView} />
              </Switch>
            </div>
          </LayoutManagerWithViewController>
        </NavigationProvider>
      </MemoryRouter>
    );
  }
}
