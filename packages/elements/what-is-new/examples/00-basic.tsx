import React from 'react';
import { WhatIsNew } from '../src';
import { createWhatIsNewProviderFromJson } from '../src/clients/what-is-new-from-json';
import { Feature } from '../src/types';
import { getFeatures } from './assets/features';

export default function Example() {
  return (
    <div
      style={{
        paddingLeft: '250px',
        paddingTop: '40px',
      }}
    >
      <WhatIsNew
        whatIsNewProvider={createWhatIsNewProviderFromJson(getFeatures(10))}
      />
    </div>
  );
}
