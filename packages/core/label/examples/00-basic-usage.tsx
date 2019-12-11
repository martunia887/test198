import React, { FC } from 'react';
import TextField from '@atlaskit/textfield';
import Label from '../src';

const LabelExample: FC = props => (
  <div>
    <Label htmlFor="basic-textfield">Simple label</Label>
    <TextField id="basic-textfield" />
    <Label htmlFor="required-textfield" isRequired>
      Required label
    </Label>
    <TextField id="required-textfield" isRequired />
  </div>
);

export default LabelExample;
