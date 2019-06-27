// @flow
import React from 'react';
import Select from '../src';
import { cities } from './common/data';
import GlobalTheme, { AtlaskitThemeProvider } from '@atlaskit/theme';

// data imported for brevity; equal to the options from Single Select example
const MultiExample = () => (
  <AtlaskitThemeProvider mode={'dark'}>
    <GlobalTheme.Provider value={() => ({ mode: 'dark' })}>
      <Select
        className="multi-select"
        classNamePrefix="react-select"
        options={cities}
        isMulti
        isSearchable={false}
        placeholder="Choose a City"
      />
    </GlobalTheme.Provider>
  </AtlaskitThemeProvider>
);

export default MultiExample;
