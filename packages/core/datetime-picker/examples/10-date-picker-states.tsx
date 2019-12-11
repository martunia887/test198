// eslint-disable-next-line no-restricted-imports
import { format } from 'date-fns';
import React from 'react';
import Label from '@atlaskit/label';
import { DatePicker } from '../src';

function now(day: number) {
  const date = new Date();
  date.setDate(day);
  return format(date, 'YYYY-MM-DD');
}

export default () => {
  return (
    <div>
      <Label>Stock</Label>
      <DatePicker
        id="datepicker"
        onChange={console.log}
        testId={'datePicker'}
      />

      <Label>Disabled input</Label>
      <DatePicker isDisabled onChange={console.log} />

      <Label>Disabled dates</Label>
      <DatePicker
        disabled={[now(31), now(30), now(10), now(11), now(12)]}
        onChange={console.log}
      />

      <Label>Custom date format</Label>
      <DatePicker
        dateFormat="DD/MMM/YY"
        selectProps={{
          placeholder: 'e.g. 31/Dec/18',
        }}
        onChange={console.log}
      />
    </div>
  );
};
