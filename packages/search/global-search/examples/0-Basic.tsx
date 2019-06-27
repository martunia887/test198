import * as React from 'react';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { setupMocks, teardownMocks } from '../example-helpers/mockApis';
import { GlobalQuickSearch } from '../src';
import withNavigation from '../example-helpers/withNavigation';
import GlobalTheme, { AtlaskitThemeProvider } from '@atlaskit/theme';

const GlobalQuickSearchWrapper = withNavigation(GlobalQuickSearch);

const logEvent = (event: any) => {
  const { eventType, action, actionSubject, actionSubjectId } = event.payload;
  console.debug(
    `${eventType} | ${action} ${actionSubject} ${actionSubjectId}`,
    event.payload.attributes,
    event.payload,
  );
};

export default class GlobalQuickSearchExample extends React.Component {
  componentWillMount() {
    setupMocks();
  }

  componentWillUnmount() {
    teardownMocks();
  }

  render() {
    return (
      <AtlaskitThemeProvider mode={'dark'}>
        <GlobalTheme.Provider value={() => ({ mode: 'dark' })}>
          <AnalyticsListener onEvent={logEvent} channel="fabric-elements">
            <GlobalQuickSearchWrapper />
          </AnalyticsListener>
        </GlobalTheme.Provider>
      </AtlaskitThemeProvider>
    );
  }
}
