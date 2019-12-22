import React from 'react';
import { ObjectInterpolation } from '@emotion/core';

import { easeInOut } from '../utils/curves';
import { largeDurationMs } from '../utils/durations';

import KeyframesMotion, { KeyframesMotionProps } from './keyframes-motion';
import { From } from './types';

const entranceMotions = {
  bottom: 'translate3d(0, calc(5% + 4px), 0)',
  left: 'translate3d(calc(-5% - 4px), 0, 0)',
  right: 'translate3d(calc(5% + 4px), 0, 0)',
  top: 'translate3d(0, calc(-5% - 4px), 0)',
};

const exitMotions = {
  bottom: 'translate3d(0, calc(-5% - 4px), 0)',
  left: 'translate3d(calc(5% + 4px), 0, 0)',
  right: 'translate3d(calc(-5% - 4px), 0, 0)',
  top: 'translate3d(0, calc(5% + 4px), 0)',
};

export const fadeInAnimation = (
  movement?: From,
): ObjectInterpolation<undefined> => {
  return {
    from: {
      opacity: 0,
      ...(movement !== undefined && {
        transform: entranceMotions[movement],
      }),
    },
    '50%': {
      opacity: 1,
    },
    to: {
      transform: 'none',
    },
  };
};

export const fadeOutAnimation = (
  movement?: From,
): ObjectInterpolation<undefined> => ({
  from: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  },
  to: {
    opacity: 0,
    ...(movement !== undefined && {
      transform: exitMotions[movement],
    }),
  },
});

/**
 * Props for controlling the behaviour of the FadeIn animation
 */
export interface FadeKeyframesMotionProps extends KeyframesMotionProps {
  /**
   * Sets an entering and exiting motion
   */
  entranceDirection?: From;
}

const FadeIn: React.FC<FadeKeyframesMotionProps> = ({
  children,
  duration = largeDurationMs,
  entranceDirection: entranceSlideDirection,
  ...props
}: FadeKeyframesMotionProps) => {
  return (
    <KeyframesMotion
      duration={duration}
      enteringAnimation={fadeInAnimation(entranceSlideDirection)}
      exitingAnimation={fadeOutAnimation(entranceSlideDirection)}
      animationTimingFunction={() => easeInOut}
      {...props}
    >
      {children}
    </KeyframesMotion>
  );
};

export default FadeIn;
