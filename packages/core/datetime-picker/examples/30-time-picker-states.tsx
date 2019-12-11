import React from 'react';
import Label from '@atlaskit/label';
import { TimePicker } from '../src';

export default () => {
  return (
    <div>
      <Label>Stock</Label>
      <TimePicker onChange={console.log} />

      <Label>Disabled input</Label>
      <TimePicker isDisabled onChange={console.log} />
    </div>
  );
};
