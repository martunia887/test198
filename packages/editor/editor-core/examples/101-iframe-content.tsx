import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Button, { ButtonGroup } from '@atlaskit/button';

const colors = ['lime', 'yellow', 'purple', 'orange', 'green', 'blue'];

export const Wrapper: any = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default () => {
  const [colorIndex, setColorIndex] = useState(0);

  return (
    <Wrapper style={{ background: colors[colorIndex] }}>
      <Button
        tabIndex={-1}
        appearance="primary"
        onClick={() => {
          setColorIndex(colorIndex === colors.length - 1 ? 0 : colorIndex + 1);
        }}
      >
        Click me
      </Button>
    </Wrapper>
  );
};
