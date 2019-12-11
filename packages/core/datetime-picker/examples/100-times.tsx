import React from 'react';
import Label from '@atlaskit/label';
import { DateTimePicker, TimePicker } from '../src';

export default () => {
  const times: Array<string> = ['10:00', '10:15', '10:30', '10:45', '11:00'];

  return (
    <div>
      <Label>TimePicker - times</Label>
      <TimePicker
        id="timepicker"
        times={times}
        selectProps={{ classNamePrefix: 'timepicker-select' }}
        testId={'timePicker'}
      />

      <Label>DateTimePicker - times</Label>
      <DateTimePicker times={times} />
    </div>
  );
};
