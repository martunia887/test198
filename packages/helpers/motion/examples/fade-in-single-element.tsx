import React, { useState } from 'react';
import { FadeIn } from '../src';
import { Block, RetryContainer, Centered } from '../examples-utils';
import Button from '@atlaskit/button';

export default () => {
  const directions = [
    undefined,
    'top' as const,
    'right' as const,
    'bottom' as const,
    'left' as const,
  ];
  const [direction, setDirection] = useState(0);

  return (
    <RetryContainer>
      <Centered>
        <FadeIn entranceDirection={directions[direction]}>
          {props => <Block {...props} />}
        </FadeIn>
      </Centered>
      <Centered>
        <Button
          onClick={() => {
            setDirection((direction + 1) % directions.length);
          }}
        >
          {directions[direction] !== undefined
            ? `Enter from ${directions[direction]}`
            : 'No Motion'}
        </Button>
      </Centered>
    </RetryContainer>
  );
};
