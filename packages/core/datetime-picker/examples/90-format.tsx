import React from 'react';
import Label from '@atlaskit/label';
import { DatePicker, DateTimePicker, TimePicker } from '../src';

export default () => {
  return (
    <div>
      Dates & Times can be formatted using any format supported by{' '}
      <a
        href="https://date-fns.org/v1.29.0/docs/format"
        target="_blank"
        rel="noopener noreferrer"
      >
        date-fns format function
      </a>
      .<Label>TimePicker - timeFormat (h:mm a)</Label>
      <TimePicker onChange={console.log} timeFormat="h:mm a" />
      <Label>DatePicker - dateFormat (DD/MM/YYYY)</Label>
      <DatePicker onChange={console.log} dateFormat="DD/MM/YYYY" />
      <Label>
        DateTimePicker - dateFormat (HH:mm) & timeFormat (Do MMMM YYYY)
      </Label>
      <DateTimePicker
        onChange={console.log}
        timeFormat="HH:mm"
        dateFormat="Do MMMM YYYY"
      />
    </div>
  );
};
