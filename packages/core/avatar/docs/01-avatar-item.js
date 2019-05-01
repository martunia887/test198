// @flow
import React from 'react';
import { md, Props } from '@atlaskit/docs';
import Page from '@atlaskit/contentful';
import createExample from './components/createExample';

export default md`
${<Page slug="avatar-item" createExample={createExample} />}

${(
  <Props
    heading="Avatar Item Props"
    props={require('!!extract-react-types-loader!../src/components/AvatarItem')}
  />
)}
`;
