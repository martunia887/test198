/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Block, RetryContainer, Centered } from '../examples-utils';
import { SlideIn, ExitingPersistence } from '../src';
import { From } from '../src/entering/types';

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

        <Centered
          css={{
            overflow: 'hidden',
            height: '300px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <ExitingPersistence>
            {isIn && (
              <SlideIn from={froms[fromIndex]}>
                {props => (
                  <Block
                    {...props}
                    css={{
                      height: '95%',
                      width: '95%',
                      position: 'absolute',
                      margin: 'auto',
                    }}
                  />
                )}
              </SlideIn>
            )}
          </ExitingPersistence>
        </Centered>
      </div>
    </RetryContainer>
  );
};
