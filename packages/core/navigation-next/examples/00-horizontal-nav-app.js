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

import { Label } from '@atlaskit/field-base';
import { ToggleStateless } from '@atlaskit/toggle';

import { LayoutManagerWithViewController, NavigationProvider } from '../src';

import { LinkItem, ProjectSwitcher } from './shared/components';
import RootViews from './shared/views/root';
import ContainerViews from './shared/views/container';
import GlobalNavigation from './shared/components/GlobalNavigation';

import {
  BacklogView,
  ProjectsView,
  DashboardsView,
  IssuesView,
  FiltersView,
} from './shared/routes';

export default class App extends Component<
  {},
  {
    isFlyoutAvailable: boolean,
    isAlternateFlyoutBehaviourEnabled: boolean,
    isFullWidthFlyoutEnabled: boolean,
  },
> {
  state = {
    isFlyoutAvailable: true,
    isAlternateFlyoutBehaviourEnabled: true,
    isFullWidthFlyoutEnabled: false,
  };

  onFlyoutToggle = () => {
    this.setState(state => ({ isFlyoutAvailable: !state.isFlyoutAvailable }));
  };

  onAlternateBehaviourToggle = () => {
    this.setState(state => ({
      isAlternateFlyoutBehaviourEnabled: !state.isAlternateFlyoutBehaviourEnabled,
    }));
  };

  onFullWidthFlyoutToggle = () => {
    this.setState(state => ({
      isFullWidthFlyoutEnabled: !state.isFullWidthFlyoutEnabled,
    }));
  };

  render() {
    const {
      isFlyoutAvailable,
      isAlternateFlyoutBehaviourEnabled,
      isFullWidthFlyoutEnabled,
    } = this.state;

    return (
      <MemoryRouter>
        <NavigationProvider>
          <LayoutManagerWithViewController
            customComponents={{ LinkItem, ProjectSwitcher }}
            experimental_flyoutOnHover={isFlyoutAvailable}
            experimental_alternateFlyoutBehaviour={
              isAlternateFlyoutBehaviourEnabled
            }
            experimental_fullWidthFlyout={isFullWidthFlyoutEnabled}
            experimental_horizontalGlobalNav
            globalNavigation={GlobalNavigation}
          >
            <div style={{ padding: 40 }}>
              <RootViews />
              <ContainerViews />
              <Switch>
                <Route path="/projects/:projectId" component={BacklogView} />
                <Route path="/projects" component={ProjectsView} />
                <Route path="/issues/:issueId" component={IssuesView} />
                <Route path="/filters/:filterId" component={FiltersView} />
                <Route path="/" component={DashboardsView} />
              </Switch>

              <Label label="Toggle flyout on hover (experimental)" />
              <ToggleStateless
                isChecked={isFlyoutAvailable}
                onChange={this.onFlyoutToggle}
              />
              <Label label="Toggle alternate hover behaviour (experimental)" />
              <ToggleStateless
                isChecked={isAlternateFlyoutBehaviourEnabled}
                onChange={this.onAlternateBehaviourToggle}
              />
              <Label label="Toggle full width flyout (experimental)" />
              <ToggleStateless
                isChecked={isFullWidthFlyoutEnabled}
                onChange={this.onFullWidthFlyoutToggle}
              />
            </div>
          </LayoutManagerWithViewController>
        </NavigationProvider>
      </MemoryRouter>
    );
  }
}
