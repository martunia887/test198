// @flow

import React from 'react';
import Textfield, { Theme } from '../src';

export default function() {
  const colors = {
    N0: '#FFFFFF',
    N10: '#FAFCFC',
    N30: '#EBEEF0',
    N40: '#DFE3E6',
    N70: '#A6B3BA',
    N200: '#6B808C',
    N800: '#17394D',
    B500: '#0079BF',
  };
  const nachosTheme = (theme, props) => ({
    ...theme(props),
    backgroundColor: colors.N10,
    backgroundColorFocus: colors.N0,
    borderColor: colors.N40,
    borderColorFocus: colors.B500,
    padding: '6px 10px',
    lineHeight: '20px',
    placeholderTextColor: colors.N200,
    textColor: colors.N800,
    disabledRules: {
      ...theme(props).disabledRules,
      backgroundColor: colors.N30,
      backgroundColorHover: colors.N30,
      borderColor: colors.N30,
      textColor: colors.N70,
    },
  });

  return (
    <div>
      <Theme.Provider value={nachosTheme}>
        <label htmlFor="default-value">Default Value</label>
        <Textfield
          isCompact
          name="default-value"
          defaultValue="Tacos are yummy!"
        />

        <label htmlFor="focused">Focused</label>
        <Textfield name="focused" autoFocus defaultValue="Focus on me!" />
        <label htmlFor="disabled">Disabled</label>
        <Textfield
          name="disabled"
          isDisabled
          defaultValue="can't touch this..."
        />
        <label htmlFor="placeholder">Placeholder</label>
        <Textfield name="placeholder" placeholder="Click here to input..." />
      </Theme.Provider>
    </div>
  );
}
