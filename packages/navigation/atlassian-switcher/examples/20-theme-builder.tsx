import * as React from 'react';
import styled from 'styled-components';
import {
  mockEndpoints,
  REQUEST_FAST,
} from '@atlaskit/atlassian-switcher-test-utils';

import AtlassianSwitcher from '../src';

import { withAnalyticsLogger, withIntlProvider } from './helpers';
import ThemeBuilder from './helpers/ThemeBuilder';

const Container = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 8px;
  display: inline-block;
  margin: 5px;
  vertical-align: top;
`;
class InlineDialogSwitcherExample extends React.Component {
  state = {
    isLoaded: false,
  };

  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    mockEndpoints(
      'jira',
      originalMockData => {
        return {
          ...originalMockData,
          RECENT_CONTAINERS_DATA: {
            data: [],
          },
          CUSTOM_LINKS_DATA: {
            data: [],
          },
          XFLOW_SETTINGS: {},
        };
      },
      REQUEST_FAST,
    );
    this.setState({
      isLoaded: true,
    });
  };

  onTriggerXFlow = (productKey: string, sourceComponent: string) => {
    console.log(
      `Triggering xflow for => ${productKey} from ${sourceComponent}`,
    );
  };

  render() {
    return (
      this.state.isLoaded && (
        <ThemeBuilder>
          {theme => (
            <Container>
              <AtlassianSwitcher
                product="trello"
                disableCustomLinks
                disableRecentContainers
                disableHeadings
                isDiscoverMoreForEveryoneEnabled
                cloudId="some-cloud-id"
                triggerXFlow={this.onTriggerXFlow}
                appearance="standalone"
                theme={theme}
              />
            </Container>
          )}
        </ThemeBuilder>
      )
    );
  }
}

export default withIntlProvider(
  withAnalyticsLogger(InlineDialogSwitcherExample),
);
