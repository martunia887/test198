import React, { useState } from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import { colors } from '@atlaskit/theme';
import Rating, { Star } from '../src/index';

const sizes = [
  'small' as const,
  'medium' as const,
  'large' as const,
  'xlarge' as const,
];

export default () => {
  const [index, setIndex] = useState(2);
  const [color, setColor] = useState<string>();
  const size = sizes[index];
  const increase = () =>
    setIndex(prev => {
      const next = prev + 1;
      return next === sizes.length ? sizes.length - 1 : next;
    });
  const decrease = () =>
    setIndex(prev => {
      const next = prev - 1;
      return next < 0 ? 0 : next;
    });

  return (
    <div style={{ textAlign: 'center' }}>
      <ButtonGroup>
        <Button onClick={decrease}>Smaller</Button>
        <Button
          isSelected={!!color}
          onClick={() => setColor(prev => (prev ? undefined : colors.G300))}
        >
          {color ? 'Reset color' : 'Use custom color'}
        </Button>
        <Button onClick={increase}>Bigger</Button>
      </ButtonGroup>

      <div style={{ margin: '16px 0 8px' }}>
        <Rating groupName="rating--star">
          <Star
            size={size}
            color={color}
            label="Terrible"
            value="one"
            id="one"
          />
          <Star size={size} color={color} label="Meh" value="two" id="two" />
          <Star
            size={size}
            color={color}
            label="Good"
            value="three"
            id="three"
          />
          <Star
            size={size}
            color={color}
            label="Great"
            value="four"
            id="four"
          />
          <Star
            size={size}
            color={color}
            label="Fantastic!"
            value="five"
            id="five"
          />
        </Rating>
      </div>
    </div>
  );
};
