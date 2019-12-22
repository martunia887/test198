import * as React from 'react';
import {
  onSelection,
  resourceProvider,
  MockPresenceResource,
} from '../example-helpers';
import MentionTextInput from '../example-helpers/demo-mention-text-input';

export default function Example() {
  return (
    <MentionTextInput
      label="User search"
      onSelection={onSelection}
      resourceProvider={resourceProvider}
      presenceProvider={new MockPresenceResource()}
    />
  );
}
