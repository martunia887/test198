//@flow

import * as React from 'react';
import {
  md,
  code,
  Example,
  Props,
  AtlassianInternalWarning,
  DevPreviewWarning,
} from '@atlaskit/docs';

export default md`
${(
  <>
    <div style={{ marginBottom: '0.5rem' }}>
      <AtlassianInternalWarning />
    </div>
    <div style={{ marginTop: '0.5rem' }}>
      <DevPreviewWarning />
    </div>
  </>
)}

## Usage

${code`
  import { RefinementBar } from '@atlaskit/refinement-bar';
`}

${(
  <Example
    packageName="@atlaskit/refinement-bar"
    Component={require('../examples/00-refinement-bar').default}
    source={require('!!raw-loader!../examples/00-refinement-bar')}
    title="Basic Usage"
    language="jsx"
  />
)}

${(
  <Props
    heading="Refinement bar props"
    props={require('!!extract-react-types-loader!../src/components/RefinementBar')}
  />
)}
`;
