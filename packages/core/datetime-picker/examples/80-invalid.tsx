import React from 'react';
import Label from '@atlaskit/label';
import { DatePicker, DateTimePicker, TimePicker } from '../src';

export default () => {
  return (
    <div>
      <Label>DatePicker - isInvalid</Label>
      <TimePicker onChange={console.log} isInvalid />

      <Label>TimePicker - isInvalid</Label>
      <DatePicker onChange={console.log} isInvalid />

      <Label>DateTimePicker - isInvalid</Label>
      <DateTimePicker onChange={console.log} isInvalid />
    </div>
  );
};
