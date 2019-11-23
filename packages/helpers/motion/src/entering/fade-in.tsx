import React from 'react';
import { ObjectInterpolation } from '@emotion/core';
import { easeInOut } from '../utils/curves';
import { largeDurationMs } from '../utils/durations';
import EnteringMotion, { KeyframesMotionProps } from './keyframes-motion';

export const fadeInAnimation = (): ObjectInterpolation<undefined> => ({
  from: {
    opacity: 0,
    transform: 'translate3d(0, calc(5% + 4px), 0)',
  },
  '50%': {
    opacity: 1,
  },
  to: {
    transform: 'none',
  },
});

export const fadeOutAnimation = (): ObjectInterpolation<undefined> => ({
  from: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  },
  to: {
    opacity: 0,
    transform: 'translate3d(0, calc(-5% + -4px), 0)',
  },
});

const FadeIn: React.FC<KeyframesMotionProps> = ({
  children,
  duration = largeDurationMs,
  ...props
}: KeyframesMotionProps) => {
  return (
    <EnteringMotion
      duration={duration}
      enteringAnimation={fadeInAnimation()}
      exitingAnimation={fadeOutAnimation()}
      animationTimingFunction={() => easeInOut}
      {...props}
    >
      {children}
    </EnteringMotion>
  );
};

export default FadeIn;
