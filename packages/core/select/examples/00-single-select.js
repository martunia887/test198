// @flow
import React from 'react';
import Select from '../src';
import GlobalTheme, { AtlaskitThemeProvider } from '@atlaskit/theme';

const SingleExample = () => (
  <AtlaskitThemeProvider mode={'dark'}>
    <GlobalTheme.Provider value={() => ({ mode: 'dark' })}>
      <Select
        className="single-select"
        classNamePrefix="react-select"
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
    </GlobalTheme.Provider>
  </AtlaskitThemeProvider>
);

export default SingleExample;
