import React from 'react';
import Rating, { Star } from '../src/index';

export default () => {
  return (
    <div style={{ textAlign: 'center', marginTop: 8 }}>
      <Rating groupName="rating--uncontrolled" testId="uncontrolled-rating">
        <Star label="Terrible" value="one" id="one" />
        <Star label="Meh" value="two" id="two" />
        <Star label="Good" value="three" id="three" />
        <Star label="Great" value="four" id="four" />
        <Star label="Fantastic!" value="five" id="five" />
      </Rating>
    </div>
  );
};
