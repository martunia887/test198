import React from 'react';
import Label from '@atlaskit/label';
import { DateTimePicker } from '../src';

export default () => {
  return (
    <div>
      <Label>Stock</Label>
      <DateTimePicker onChange={console.log} />

      <Label>Disabled input</Label>
      <DateTimePicker isDisabled onChange={console.log} />

      <Label>Custom date format</Label>
      <DateTimePicker
        onChange={console.log}
        dateFormat="DD/MMM/YY"
        datePickerSelectProps={{
          placeholder: 'e.g. 31/Dec/18',
        }}
      />
    </div>
  );
};
