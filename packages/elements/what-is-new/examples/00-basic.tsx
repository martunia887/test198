import React from 'react';
import { WhatIsNew } from '../src';
import { createWhatIsNewProviderFromJson } from '../src/clients/what-is-new-from-json';
import { Feature } from '../src/types';

const feature: Feature = {
  id: '1',
  date: 1573700033538,
  title: 'Feature 1 - Wow!',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  link: 'https://google.com/',
};

export default function Example() {
  return (
    <div
      style={{
        paddingLeft: '250px',
        paddingTop: '40px',
      }}
    >
      <WhatIsNew
        whatIsNewProvider={createWhatIsNewProviderFromJson(new Array(10).fill(feature))}
      />
    </div>
  );
}
