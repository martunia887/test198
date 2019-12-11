import React from 'react';
import { ObjectInterpolation } from '@emotion/core';
import { easeInOut } from '../utils/curves';
import { largeDurationMs } from '../utils/durations';
import KeyframesMotion, { KeyframesMotionProps } from './keyframes-motion';

export const fadeInAnimation = (
  disableMovement: boolean,
): ObjectInterpolation<undefined> => {
  return {
    from: {
      opacity: 0,
      ...(!disableMovement && {
        transform: 'translate3d(0, calc(5% + 4px), 0)',
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
  disableMovement: boolean,
): ObjectInterpolation<undefined> => ({
  from: {
    opacity: 1,
    transform: 'none',
  },
  to: {
    opacity: 0,
    ...(!disableMovement && {
      transform: 'translate3d(0, calc(-5% + -4px), 0)',
    }),
  },
});

/**
 * Props for controlling the behaviour of the FadeIn animation
 */
export interface FadeInKeyframesMotionProps extends KeyframesMotionProps {
  /**
   * Disables the subtle slide effect when entering and exiting
   */
  disableMovement?: boolean;
}

const FadeIn: React.FC<FadeInKeyframesMotionProps> = ({
  children,
  duration = largeDurationMs,
  disableMovement = false,
  ...props
}: FadeInKeyframesMotionProps) => {
  return (
    <KeyframesMotion
      duration={duration}
      enteringAnimation={fadeInAnimation(disableMovement)}
      exitingAnimation={fadeOutAnimation(disableMovement)}
      animationTimingFunction={() => easeInOut}
      {...props}
    >
      {children}
    </KeyframesMotion>
  );
};

export default FadeIn;
