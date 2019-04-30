// @flow
import React from 'react';
import { md, Example, Props, code } from '@atlaskit/docs';
import Page from '@atlaskit/contentful';
import createExample from './components/createExample';

export default md`
${<Page slug="avatar-presence" createExample={createExample} />}

## Usage

${code`import { Presence } from '@atlaskit/avatar';`}

${(
  <Example
    packageName="@atlaskit/avatar"
    Component={require('../examples/04-basicPresence').default}
    title="Presence"
    source={require('!!raw-loader!../examples/04-basicPresence')}
  />
)}

${(
  <Props
    heading="Presence Props"
    props={require('!!extract-react-types-loader!../src/components/Presence')}
  />
)}
`;
