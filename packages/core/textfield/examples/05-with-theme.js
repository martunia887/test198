// @flow

import React from 'react';
import merge from 'lodash.merge';
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

  // you have to know about every possible state that changes styles or else default styles get overwritten
  const getTextFieldStyles = (
    defaultTheme,
    { isFocused, isInvalid, isDisabled },
  ) => {
    if (isDisabled) {
      return {
        backgroundColor: colors.N30,
        borderColor: colors.B500,
        color: colors.N70,
      };
    }
    if (isFocused) {
      return {
        borderColor: colors.B500,
        backgroundColor: colors.N0,
      };
    }
    // if this isn't here, default invalid styles will get overwritten by the next statement
    if (isInvalid) {
      return {};
    }
    return {
      backgroundColor: colors.N10,
      borderColor: colors.N40,
      color: colors.N800,
      // this is a little funky bc you have to know that we're using pseudoselector styling
      '&:hover': {
        backgroundColor: colors.B500,
      },
    };
  };

  // everything is styleable!
  // and you can add other properties not originally in the theme
  const nachosTheme = (defaultTheme, props) => ({
    container: {
      ...defaultTheme(props).container,
      padding: '6px 10px',
      lineHeight: '20px',
      placeholderTextColor: colors.N200,
      ...getTextFieldStyles(defaultTheme(props), props),
    },
    input: {
      ...defaultTheme(props).input,
    },
  });

  return (
    <div>
      <Theme.Provider value={(theme, props) => nachosTheme(theme, props)}>
        <label htmlFor="default-value">Default Value</label>
        <Textfield
          isCompact
          name="default-value"
          defaultValue="Tacos are yummy!"
        />

        <label htmlFor="focused">Focused</label>
        <Textfield name="focused" autoFocus defaultValue="Focus on me!" />
        <label htmlFor="invalid">Invalid</label>
        <Textfield name="invalid" isInvalid />
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
