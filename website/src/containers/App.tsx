import React from 'react';
import Media from 'react-media';
import { RouteProps } from 'react-router';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Page from '@atlaskit/page';
import GlobalTheme from '@atlaskit/theme';

import AnalyticsListeners from '../components/Analytics/AnalyticsListeners';
import ErrorBoundary from '../components/ErrorBoundary';
import ScrollHandler from '../components/ScrollToTop';
import { DESKTOP_BREAKPOINT_MIN } from '../constants';
import FullscreenExamples from '../pages/Examples';
import { modalRoutes, pageRoutes } from '../routes';

import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export default () => {
  return (
    <GlobalTheme.Provider value={() => ({ mode: 'light' })}>
      <BrowserRouter>
        <Media query={`(min-width: ${DESKTOP_BREAKPOINT_MIN}px)`}>
          {(isDesktop: boolean) => (
            <AnalyticsListeners>
              <ScrollHandler />
              <Switch>
                <Route
                  path="/examples/:groupId?/:pkgId?/:exampleId*"
                  component={FullscreenExamples}
                />
                <Route
                  render={appRouteDetails => (
                    <Page
                      navigation={
                        isDesktop ? <DesktopNav {...appRouteDetails} /> : false
                      }
                    >
                      {!isDesktop && (
                        <MobileNav appRouteDetails={appRouteDetails} />
                      )}
                      <ErrorBoundary>
                        <Switch>
                          {pageRoutes.map((routeProps: RouteProps, index) => (
                            <Route {...routeProps} key={index} />
                          ))}
                        </Switch>

                        {modalRoutes.map((modal, index) => (
                          <Route {...modal} key={index} />
                        ))}
                      </ErrorBoundary>
                    </Page>
                  )}
                />
              </Switch>
            </AnalyticsListeners>
          )}
        </Media>
      </BrowserRouter>
    </GlobalTheme.Provider>
  );
};
