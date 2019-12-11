import React from 'react';
import Label from '@atlaskit/label';
import { DatePicker, DateTimePicker, TimePicker } from '../src';

export default () => {
  return (
    <div>
      <Label>TimePicker - default no icon</Label>
      <TimePicker onChange={console.log} />

      <Label>TimePicker - subtle appearance</Label>
      <TimePicker onChange={console.log} appearance="subtle" />
      <Label>TimePicker - compact spacing</Label>
      <TimePicker onChange={console.log} spacing="compact" />

      <Label>DatePicker - default</Label>
      <DatePicker onChange={console.log} />
      <Label>DatePicker - hideIcon</Label>
      <DatePicker onChange={console.log} hideIcon />
      <Label>DatePicker - subtle appearance</Label>
      <DatePicker onChange={console.log} appearance="subtle" />
      <Label>DatePicker - compact spacing</Label>
      <DatePicker onChange={console.log} spacing="compact" />

      <Label>DateTimePicker - default</Label>
      <DateTimePicker onChange={console.log} />
      <Label>DateTimePicker - hideIcon</Label>
      <DateTimePicker onChange={console.log} hideIcon />
      <Label>DateTimePicker - subtle appearance</Label>
      <DateTimePicker onChange={console.log} appearance="subtle" />
      <Label>DateTimePicker - compact spacing</Label>
      <DateTimePicker onChange={console.log} spacing="compact" />
    </div>
  );
};
