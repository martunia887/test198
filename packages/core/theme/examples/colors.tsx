import React from 'react';
import color from 'color';
import { colors } from '../src';

const anyColors = colors as any;

export default () => (
  <>
    {Object.keys(anyColors)
      .filter(c => typeof anyColors[c] === 'string')
      .map(c => (
        <span
          key={c}
          style={{
            backgroundColor: `${anyColors[c]}`,
            borderRadius: 3,
            color: `${color(anyColors[c]).negate()}`,
            display: 'inline-block',
            marginBottom: 10,
            marginRight: 10,
            padding: 10,
          }}
        >
          {c}
        </span>
      ))}
  </>
);
