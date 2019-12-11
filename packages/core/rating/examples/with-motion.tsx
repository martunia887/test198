import React, { useState } from 'react';
import { StaggeredEntrance, ZoomIn } from '@atlaskit/motion';
import Button from '@atlaskit/button';
import Rating, { Star, StarProps } from '../src/index';

const ZoomInStar = (props: StarProps) => (
  <ZoomIn>{motion => <Star {...motion} {...props} />}</ZoomIn>
);

export default () => {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: 8 }}>
        <Button onClick={() => setCount(prev => prev + 1)}>Re-enter</Button>
      </div>

      <StaggeredEntrance>
        <Rating key={count} groupName="rating--motion">
          <ZoomInStar label="Terrible" value="one" id="one" />
          <ZoomInStar label="Meh" value="two" id="two" />
          <ZoomInStar label="Good" value="three" id="three" />
          <ZoomInStar label="Great" value="four" id="four" />
          <ZoomInStar label="Fantastic!" value="five" id="five" />
        </Rating>
      </StaggeredEntrance>
    </div>
  );
};
