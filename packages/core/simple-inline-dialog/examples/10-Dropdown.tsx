import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import Dialog from '../src';
import { Placement } from '@atlaskit/popper';
import Button from '@atlaskit/button';

const Spacer = styled.div`
  margin: 250px;
`;

const SizedContent = styled.div`
  align-items: center;
  text-align: center;
  vertical-align: center;
  padding: 30px;
  height: 80px;
  overflow: auto;
`;

type DialogProps = {
  setPosition(): void;
  position: string;
};

const DialogContent: FC<DialogProps> = ({ setPosition, position }) => {
  return (
    <SizedContent>
      <Button onClick={() => setPosition()}>Toggle Position</Button>
      <p>
        Current position: <strong>{position}</strong>
      </p>
      <hr />
      <p>Scroll down.</p>
      <Button>Button 5</Button>
      <Button>Button 6</Button>
    </SizedContent>
  );
};

export default () => {
  const [idx, setIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const positions: Placement[] = [
    'bottom-start',
    'bottom',
    'bottom-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'left-start',
    'left',
    'left-end',
    'auto-start',
    'auto',
    'auto-end',
  ];
  const position = positions[idx];

  const setPosition = () => {
    if (idx !== positions.length - 1) {
      setIdx(idx + 1);
    } else {
      setIdx(0);
    }
  };

  return (
    <Spacer>
      <Button>Dummy Button</Button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        content={
          <DialogContent setPosition={setPosition} position={position} />
        }
        trigger={triggerProps => (
          <Button {...triggerProps} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Close' : 'Open'} Dialog
          </Button>
        )}
        position={position}
      />
      <Button>Dummy Button</Button>
    </Spacer>
  );
};
