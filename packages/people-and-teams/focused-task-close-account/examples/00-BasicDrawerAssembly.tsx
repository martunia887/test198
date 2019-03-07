import * as React from 'react';
import Button from '@atlaskit/button';

import accessibleSites from '../mocks/accessibleSites';
import { catherineHirons } from '../mocks/users';

import { IntlProvider } from 'react-intl';

import {
  FocusedTaskCloseAccount,
  DeleteUserOverviewScreen,
  DeleteUserContentPreviewScreen,
} from '..';

const submitButton = (
  <Button appearance="primary" onClick={() => null}>
    Delete account
  </Button>
);

export default function Example() {
  return (
    <React.Fragment>
      <h1>See code</h1>
      <IntlProvider locale="en">
        <FocusedTaskCloseAccount
          onClose={() => {}}
          isOpen={false}
          screens={[
            <DeleteUserOverviewScreen
              accessibleSites={accessibleSites}
              isCurrentUser
              user={catherineHirons}
            />,
            <DeleteUserContentPreviewScreen user={catherineHirons} />,
          ]}
          submitButton={submitButton}
          learnMoreLink={''}
        />
      </IntlProvider>
    </React.Fragment>
  );
}
