import React from 'react';
import Label from '@atlaskit/label';
import { TimePicker, DatePicker, DateTimePicker } from '../src';

export default () => {
  return (
    <div>
      <Label>DatePicker defaultValue defaultIsOpen</Label>
      <DatePicker
        defaultValue="2018-03-01"
        defaultIsOpen
        onChange={console.log}
      />

      <Label>TimePicker defaultValue defaultIsOpen</Label>
      <TimePicker defaultValue="10:00am" defaultIsOpen onChange={console.log} />

      <Label>DateTimePicker defaultValue</Label>
      <DateTimePicker
        defaultValue="2018-01-02T14:30-08:00"
        onChange={console.log}
      />
    </div>
  );
};
