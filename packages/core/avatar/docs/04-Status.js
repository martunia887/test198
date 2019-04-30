// @flow
import React from 'react';
import { md, Example, Props, code } from '@atlaskit/docs';
import Page from '@atlaskit/contentful';
import createExample from './components/createExample';

export default md`
${<Page slug="status" createExample={createExample} />}

## Usage

${code`import { Status } from '@atlaskit/avatar';`}

${(
  <Example
    packageName="@atlaskit/avatar"
    Component={require('../examples/05-basicStatus').default}
    title="Status"
    source={require('!!raw-loader!../examples/05-basicStatus')}
  />
)}

${(
  <Props
    heading="Status Props"
    props={require('!!extract-react-types-loader!../src/components/Status')}
  />
)}
`;
