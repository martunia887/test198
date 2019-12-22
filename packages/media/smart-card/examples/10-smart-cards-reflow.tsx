import * as React from 'react';
import urlsJSON from '../examples-helpers/example-urls.json';
import { Provider, Card, Client } from '../src';

export default () => (
  <Provider
    client={new Client('prod')}
    cacheOptions={{ maxLoadingDelay: 100, maxAge: 15000 }}
  >
    <div>
      {urlsJSON.map((example: any) => (
        <Card key={example.url} url={example.url} appearance="inline" />
      ))}
    </div>
  </Provider>
);
