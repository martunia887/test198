// @flow
import React from 'react';
import { md, Example, Props, code } from '@atlaskit/docs';
import Page from '@atlaskit/contentful';
import createExample from './components/createExample';

export default md`
${<Page slug="avatar-item" createExample={createExample} />}

## Usage

${code`import { AvatarItem } from '@atlaskit/avatar';`}

${(
  <Example
    packageName="@atlaskit/avatar"
    Component={require('../examples/03-basicAvatarItem').default}
    title="Avatar Item"
    source={require('!!raw-loader!../examples/03-basicAvatarItem')}
  />
)}

${(
  <Props
    heading="Avatar Item Props"
    props={require('!!extract-react-types-loader!../src/components/AvatarItem')}
  />
)}
`;
