// @flow
import React from 'react';
import { md, Example, Props, code } from '@atlaskit/docs';
import Page from '@atlaskit/contentful';
import createExample from './components/createExample';

export default md`
${<Page slug="avatar-skeleton" createExample={createExample} />}

## Usage

${code`import { Skeleton } from '@atlaskit/avatar';`}

${(
  <Example
    packageName="@atlaskit/avatar"
    Component={require('../examples/15-skeleton').default}
    title="Skeleton"
    source={require('!!raw-loader!../examples/15-skeleton')}
  />
)}

${(
  <Props
    heading="Skeleton Props"
    props={require('!!extract-react-types-loader!../src/components/Skeleton')}
  />
)}
`;
