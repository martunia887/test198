import * as React from 'react';
import { md, Props } from '@atlaskit/docs';
import Page from '@atlaskit/contentful';
import createExample from './components/createExample';

export default md`

  ${<Page slug="button" createExample={createExample} />}

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
