// @noflow

import React from 'react';
import RefinementBar, { LozengeAsyncSelectFilter } from '../src';

const CAPITALS = [
  { label: 'Adelaide', value: 'adelaide', isBold: true, appearance: 'moved' },
  {
    label: 'Brisbane',
    value: 'brisbane',
    appearance: 'inprogress',
  },
  { label: 'Canberra', value: 'canberra' },
  { label: 'Darwin', value: 'darwin', appearance: 'moved' },
  { label: 'Hobart', value: 'hobart', isBold: true },
  {
    label: 'Melbourne',
    value: 'melbourne',
    appearance: 'new',
  },
  { label: 'Perth', value: 'perth', appearance: 'removed' },
  { label: 'Sydney', value: 'sydney', appearance: 'success' },
  {
    label:
      'Krung Thep Mahanakhon Amon Rattanakosin Mahinthara Yuthaya Mahadilok Phop Noppharat Ratchathani Burirom Udomratchaniwet Mahasathan Amon Piman Awatan Sathit Sakkathattiya Witsanukam Prasit',
    value: 'bangkok',
    maxWidth: 300,
  },
];

const FIELD_CONFIG = {
  capitals: {
    label: 'Capitals',
    type: LozengeAsyncSelectFilter,
    cacheOptions: true,
    defaultOptions: true,
    loadOptions: async inputValue => {
      const response = await new Promise(resolve => {
        setTimeout(() => resolve(CAPITALS), inputValue ? 0 : 3000);
      });

      const filtered = response.filter(e =>
        e.label.match(new RegExp(inputValue, 'i')),
      );

      const groups = filtered.reduce(
        (acc, item) => {
          if (item.value === 'bangkok') {
            acc[1].options.push(item);
          } else {
            acc[0].options.push(item);
          }

          return acc;
        },
        [
          { label: 'Australia', options: [] },
          { label: 'International', options: [] },
        ],
      );

      return groups;
    },
  },
};

const IRREMOVABLE_KEYS = Object.keys(FIELD_CONFIG);

export default function AsyncLoadedSelectOptions() {
  const [value, setValue] = React.useState({});

  return (
    <RefinementBar
      fieldConfig={FIELD_CONFIG}
      irremovableKeys={IRREMOVABLE_KEYS}
      onChange={v => setValue(v)}
      value={value}
    />
  );
}
