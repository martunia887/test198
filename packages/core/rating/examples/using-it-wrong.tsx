import React from 'react';
import Rating, { Star } from '../src/index';

export default () => {
  return (
    <>
      Look at the console for some warnings. Don't use <code>value</code> with{' '}
      <code>defaultValue</code>!
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <Rating
          value="two"
          defaultValue="three"
          groupName="rating--using-it-wrong"
        >
          <Star label="one" value="one" id="one" />
          <Star label="two" value="two" id="two" />
          <Star label="three" value="three" id="three" />
          <Star label="four" value="four" id="four" />
          <Star label="five" value="five" id="five" />
        </Rating>
      </div>
    </>
  );
};
