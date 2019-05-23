import React from 'react';
import { SelectWithoutAnalytics as Select } from '../src/Select';

const CompactSingleExample = () => (
  <Select
    className="compact-select"
    classNamePrefix="react-select"
    isSearchable
    spacing="compact"
    options={[
      { label: 'Adelaide', value: 'adelaide' },
      { label: 'Brisbane', value: 'brisbane' },
      { label: 'Canberra', value: 'canberra' },
      { label: 'Darwin', value: 'darwin' },
      { label: 'Hobart', value: 'hobart' },
      { label: 'Melbourne', value: 'melbourne' },
      { label: 'Perth', value: 'perth' },
      { label: 'Sydney', value: 'sydney' },
    ]}
    placeholder="Choose a City"
  />
);

export default CompactSingleExample;
