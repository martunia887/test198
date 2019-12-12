/** @jsx jsx */
import { jsx } from '../src';
// import { useState } from 'react';

export default () => {
  // const [color, setColor] = useState('blue');

  return (
    <div>
      <div css={{ display: 'flex', fontSize: '20px' }}>Hello, world!</div>

      <button onClick={() => setColor('red')}>red</button>
      <button onClick={() => setColor('green')}>green</button>
      <button onClick={() => setColor('blue')}>blue</button>
    </div>
  );
};
