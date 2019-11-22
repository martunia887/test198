/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Block, RetryContainer, Centered } from '../examples-utils';
import { From } from '../src/entering/slide-in';
import { SlideIn, ExitingPersistence } from '../src';

const froms: From[] = ['top', 'right', 'bottom', 'left'];

export default () => {
  const [isIn, setIsIn] = useState(true);
  const [fromIndex, setFromIndex] = useState(0);

  return (
    <RetryContainer>
      <div css={{ textAlign: 'center' }}>
        <ButtonGroup>
          <Button onClick={() => setIsIn(prev => !prev)}>
            {isIn ? 'Exit' : 'Enter'}
          </Button>
          <Button
            onClick={() => setFromIndex(prev => (prev + 1) % froms.length)}
          >
            From {froms[fromIndex]}
          </Button>
        </ButtonGroup>

        <Centered css={{ overflow: 'hidden' }}>
          <ExitingPersistence>
            {isIn && (
              <SlideIn from={froms[fromIndex]}>
                {props => <Block {...props} />}
              </SlideIn>
            )}
          </ExitingPersistence>
        </Centered>
      </div>
    </RetryContainer>
  );
};
