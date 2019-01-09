// @flow
import React from 'react';
import { md, Example, Props, code } from '@atlaskit/docs';

export default md`
  A checkbox element primarily for use in forms.

  ## Usage

${code`
import {
  Checkbox
} from '@atlaskit/nachos-checkbox';
`}

  The Checkbox export provides for controlled & uncontrolled usage and includes the label, input & icon.

  ${(
    <Example
      packageName="@atlaskit/nachos-checkbox"
      Component={require('../examples/00-basic-usage').default}
      title="Basic"
      source={require('!!raw-loader!../examples/00-basic-usage')}
    />
  )}

  ${(
    <Props
      heading="Checkbox Props"
      props={require('!!extract-react-types-loader!../src/Checkbox')}
    />
  )}
`;
