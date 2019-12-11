import React, { useState } from 'react';
import Rating, { Star } from '../src/index';

export default () => {
  const [value, setValue] = useState<string | undefined>('two');

  return (
    <div style={{ textAlign: 'center', marginTop: 8 }}>
      <Rating value={value} onChange={setValue} groupName="rating--controlled">
        <Star label="Terrible" value="one" id="one" />
        <Star label="Meh" value="two" id="two" />
        <Star label="Good" value="three" id="three" />
        <Star label="Great" value="four" id="four" />
        <Star label="Fantastic!" value="five" id="five" />
      </Rating>
    </div>
  );
};
