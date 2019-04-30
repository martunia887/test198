// @flow
import React from 'react';
import { md, Example, Props, code } from '@atlaskit/docs';
import SectionMessage from '@atlaskit/section-message';
import Page from '@atlaskit/contentful';
import createExample from './components/createExample';

export default md`
  ${<Page slug="avatar" createExample={createExample} />}

  ${(
    <Props
      heading="Avatar Props"
      props={require('!!extract-react-types-loader!../src/components/Avatar')}
    />
  )}
`;
