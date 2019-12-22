import * as React from 'react';

import { MOCK_USERS } from '../example-helpers/MockData';
import {
  MockProvider as ConversationResource,
  getDataProviderFactory,
} from '../example-helpers/MockProvider';
import { Conversation } from '../src';

const provider = new ConversationResource({
  url: 'http://mockservice/',
  user: MOCK_USERS[3],
});

export default function Example() {
  return (
    <Conversation
      objectId="ari:cloud:platform::conversation/demo"
      provider={provider}
      dataProviders={getDataProviderFactory()}
    />
  );
}
