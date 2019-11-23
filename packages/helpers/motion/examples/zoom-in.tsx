/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useState } from 'react';
import Button from '@atlaskit/button';
import { Block, RetryContainer, Centered } from '../examples-utils';
import { ZoomIn, StaggeredEntrance, ExitingPersistence } from '../src';

export default () => {
  const [isIn, setIsIn] = useState(true);

  return (
    <RetryContainer>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={() => setIsIn(prev => !prev)}>
          {isIn ? 'Exit' : 'Enter'}
        </Button>
      </div>

      <Centered css={{ height: '82px' }}>
        <StaggeredEntrance>
          <ExitingPersistence>
            {isIn && (
              <React.Fragment>
                <ZoomIn>
                  {props => <Block {...props} appearance="small" />}
                </ZoomIn>
                <ZoomIn>
                  {props => <Block {...props} appearance="small" />}
                </ZoomIn>
                <ZoomIn>
                  {props => <Block {...props} appearance="small" />}
                </ZoomIn>
              </React.Fragment>
            )}
          </ExitingPersistence>
        </StaggeredEntrance>
      </Centered>
    </RetryContainer>
  );
};
