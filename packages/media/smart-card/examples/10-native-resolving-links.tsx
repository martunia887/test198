import * as React from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import { IntlProvider } from 'react-intl';
import styled from 'styled-components';

import { Card, Client, Provider } from '..';

const NativeResolvingWrapper = styled.div`
  padding: 24px;
  text-align: center;
`;
const NativeResolvingLinkWrapper = styled.div`
  text-align: left;
`;

const ORSClient = new Client(undefined, 'staging');
const exampleUrls = [
  {
    type: 'Jira Issue',
    url: 'https://jdog.jira-dev.com/browse/BENTO-3007',
  },
  {
    type: 'Confluence Page',
    url:
      'https://pug.jira-dev.com/wiki/spaces/CP/pages/1540850242/Ecosystem+Integrations',
  },
  {
    type: 'Confluence Space',
    url:
      'https://pug.jira-dev.com/wiki/spaces/AEC/pages/4025319662/CSAT+wordclouds',
  },
];
class Example extends React.Component {
  render() {
    return (
      <NativeResolvingWrapper>
        <IntlProvider locale="en">
          <Page>
            <Grid>
              <GridColumn>
                <h3>
                  <b>Natively Resolved Smart Links! ➡️️️ ➡️️️ ➡️️️</b>
                </h3>
                <p>These links are brought to you by ORS, COP and JOP 👀</p>
                {exampleUrls.map(example => (
                  <>
                    <br />
                    <NativeResolvingLinkWrapper>
                      <span>
                        <b>{example.type}:</b>
                      </span>
                      &nbsp;&nbsp;
                      <Provider client={ORSClient}>
                        <Card
                          key={example.type}
                          url={example.url}
                          appearance="inline"
                        />
                      </Provider>
                    </NativeResolvingLinkWrapper>
                  </>
                ))}
              </GridColumn>
            </Grid>
          </Page>
        </IntlProvider>
      </NativeResolvingWrapper>
    );
  }
}

export default () => <Example />;
