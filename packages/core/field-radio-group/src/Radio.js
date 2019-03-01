// @flow
import React from 'react';
import { ThemeProvider, withTheme } from 'emotion-theming';
import Radio from './RadioBase';

const RadioWithTheme = withTheme(Radio);
const emptyTheme = {};

export default function(props: {}) {
  return (
    <ThemeProvider theme={emptyTheme}>
      <RadioWithTheme {...props} />
    </ThemeProvider>
  );
}
