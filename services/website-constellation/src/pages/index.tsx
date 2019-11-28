// @flow
import React from 'react';
import { RadioGroup } from '@atlaskit/radio';

const radioValues = [
  { name: 'color', value: 'blue', label: 'Blue' },
  { name: 'color', value: 'red', label: 'Red' },
  { name: 'color', value: 'purple', label: 'Purple' },
];

const Homepage = () => (
  <>
    <h1>WELCOME</h1>

    <RadioGroup
      label="Pick a color"
      defaultValue={radioValues[2].value}
      options={radioValues}
    />
  </>
);

export default Homepage;
