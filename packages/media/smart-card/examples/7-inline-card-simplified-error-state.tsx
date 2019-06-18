import * as React from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import { Card, Client, Provider, ResolveResponse } from '..';

class UnAuthCustomClient extends Client {
  constructor() {
    super();
  }
  fetchData(): Promise<ResolveResponse> {
    return Promise.resolve({
      meta: {
        access: 'unauthorized',
        visibility: 'restricted',
        definitionId: 'd1',
        auth: [],
      },
    } as ResolveResponse);
  }
}

class ErroringCustomClient extends Client {
  constructor() {
    super();
  }
  fetchData(url: string): Promise<ResolveResponse> {
    return Promise.reject(`Can't resolve from ${url}`);
  }
}

const normalClient = new Client();
const unAuthClient = new UnAuthCustomClient();
const erroringClient = new ErroringCustomClient();

class Example extends React.Component {
  render() {
    return (
      <Page>
        <Grid>
          <GridColumn>
            <h4>Unauthorized response</h4>
            <Provider
              client={unAuthClient}
              cacheOptions={{ maxLoadingDelay: 1000, maxAge: 15000 }}
            >
              <Card url="http://some.unauth.url" appearance="inline" />
            </Provider>
            <hr />
            <h4>Error response</h4>
            <Provider
              client={erroringClient}
              cacheOptions={{ maxLoadingDelay: 1000, maxAge: 15000 }}
            >
              <Card url="http://some.error.url" appearance="inline" />
            </Provider>
            <hr />
            <h4>Error response</h4>
            <Provider cacheOptions={{ maxLoadingDelay: 1000, maxAge: 15000 }}>
              {/**
               * NOTE: we're testing an error case that a bug in the editor
               * causes for us - it _should_ be impossible for this to happen
               * but due to some synchrony bugs it does happen.
               * See CS-1114
               */}
              <Card url={(undefined as any) as string} appearance="inline" />
            </Provider>
          </GridColumn>
        </Grid>
      </Page>
    );
  }
}

export default () => <Example />;
