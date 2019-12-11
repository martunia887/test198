import moment from 'moment';
import React from 'react';
import Label from '@atlaskit/label';
import { DatePicker } from '../src';

const parseInputValue = (date: string, dateFormat: string) => {
  return moment(date, dateFormat).toDate();
};

export default () => {
  return (
    <div>
      <Label>Custom date format and parseInputValue prop</Label>
      <DatePicker
        dateFormat="DD/MM/YY"
        parseInputValue={parseInputValue}
        selectProps={{
          placeholder: 'e.g. 31/Dec/18',
        }}
        onChange={console.log}
      />
    </div>
  );
};
