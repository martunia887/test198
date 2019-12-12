/** @jsx jsx */
import { jsx } from '../src';
import { useState } from 'react';

// works with var, but not let or const ????

export default () => {
  var [color, setColor] = useState('red');

  return (
    <div css={{ margin: '20px' }}>
      <div css={{ display: 'flex', fontSize: '20px', color }}>
        Hello, world!
      </div>

      <button onClick={() => setColor('red')}>red</button>
      <button onClick={() => setColor('green')}>green</button>
      <button onClick={() => setColor('blue')}>blue</button>
    </div>
  );
};
