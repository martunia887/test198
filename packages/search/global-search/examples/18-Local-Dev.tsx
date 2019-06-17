import * as React from 'react';
import { GlobalQuickSearch } from '../src/index';
import { Config } from '../src/api/configureSearchClients';
import withNavigation from '../example-helpers/withNavigation';

const GlobalQuickSearchInNavigation = withNavigation(GlobalQuickSearch, {
  hideLocale: true,
});
const config: Partial<Config> = {
  activityServiceUrl: 'https://api-private.stg.atlassian.com/activity',
  searchAggregatorServiceUrl: 'http://localhost:8080/',
  directoryServiceUrl: 'https://api-private.stg.atlassian.com/directory',
};

const cloudId = '448e3b09-19f5-4d4f-adde-5076020ac077'; // JDOG
export default class extends React.Component<{}, { cloudId: string }> {
  render() {
    return (
      <GlobalQuickSearchInNavigation
        cloudId={cloudId}
        {...config}
        enablePreQueryFromAggregator={true}
      />
    );
  }
}
