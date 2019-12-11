import React from 'react';
import Label from '@atlaskit/label';
import { gridSize } from '@atlaskit/theme';
import { DatePicker, DateTimePicker, TimePicker } from '../src';

export default () => {
  return (
    <div>
      <Label>Date picker</Label>
      <DatePicker
        innerProps={{ style: { width: gridSize() * 20 } }}
        onChange={console.log}
      />
      <Label>Time picker</Label>
      <TimePicker
        innerProps={{ style: { width: gridSize() * 20 } }}
        onChange={console.log}
      />
      <Label>Date / time picker</Label>
      <DateTimePicker
        innerProps={{ style: { width: gridSize() * 40 } }}
        onChange={console.log}
      />
    </div>
  );
};
