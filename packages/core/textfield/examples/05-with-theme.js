// @flow

import React from 'react';
import Textfield, { Theme } from '../src';

export default function() {
  const nTheme = (theme, props) => ({
    ...theme(props),
    backgroundColor: '#FAFCFC',
    backgroundColorFocus: '#FFFFFF',
    borderColor: '#DFE3E6',
    borderColorFocus: '#0079BF',
    padding: '6px 10px',
    lineHeight: '20px',
    placeholderTextColor: '#6B808C',
  });

  return (
    <div>
      <Theme.Provider value={nTheme}>
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
