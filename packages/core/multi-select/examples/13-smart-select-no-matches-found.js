// @flow
import React from 'react';
import Select from '../';
import type { GroupType } from '..//types';

const selectItems: Array<GroupType> = [
  {
    heading: 'Cities',
    items: [],
  },
];

export default () => (
  <Select
    items={selectItems}
    label="Choose your favourite"
    shouldFitContainer
  />
);
