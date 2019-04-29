import * as React from 'react';
import { md, Props } from '@atlaskit/docs';
import Page from '@atlaskit/contentful';

export default md`

  ${<Page slug="button" />}

  ${(
    <Props
      heading="Button Props"
      props={require('!!extract-react-types-loader!../src/components/ButtonProps/ButtonProps')}
    />
  )}

  ${(
    <Props
      heading="Button Group Props"
      props={require('!!extract-react-types-loader!../src/components/ButtonGroup')}
    />
  )}
`;
