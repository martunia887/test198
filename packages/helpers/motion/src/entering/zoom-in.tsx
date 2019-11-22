import React from 'react';
import { ObjectInterpolation } from '@emotion/core';
import EnteringMotion, { EnteringMotionProps } from './motion';

export const zoomInAnimation = (): ObjectInterpolation<undefined> => ({
  '0%': {
    opacity: 0,
    transform: 'scale(0.5)',
  },
  '50%': {
    opacity: 1,
  },
  '75%': {
    transform: 'scale(1.25)',
  },
  '100%': {
    transform: 'scale(1)',
  },
});

export const shrinkOutAnimation = (): ObjectInterpolation<undefined> => ({
  to: {
    opacity: 0,
    transform: 'scale(0.75)',
  },
});

const ZoomIn: React.FC<EnteringMotionProps> = ({
  children,
  duration = 125,
}: EnteringMotionProps) => {
  return (
    <EnteringMotion
      duration={duration}
      enteringAnimation={zoomInAnimation()}
      exitingAnimation={shrinkOutAnimation()}
      animationTimingFunction={() => 'ease-in-out'}
    >
      {children}
    </EnteringMotion>
  );
};

export default ZoomIn;
