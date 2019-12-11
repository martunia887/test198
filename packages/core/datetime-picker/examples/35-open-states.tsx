import React from 'react';
import Label from '@atlaskit/label';
import { DatePicker } from '../src';

export default () => {
  return (
    <div>
      <h3>DatePicker</h3>
      <Label>Always open</Label>
      <DatePicker isOpen />
    </div>
  );
};
