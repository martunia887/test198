import * as React from 'react';
import { setupMocks, teardownMocks } from '../example-helpers/mockApis';
import withNavigation from '../example-helpers/withNavigation';
import { GlobalQuickSearch } from '../src';

const GlobalQuickSearchWrapper = withNavigation(GlobalQuickSearch);

export default class GlobalQuickSearchExample extends React.Component {
  componentWillMount() {
    setupMocks({
      abTestExperimentId: 'grape-15',
    });
  }

  componentWillUnmount() {
    teardownMocks();
  }

  render() {
    return <GlobalQuickSearchWrapper />;
  }
}
