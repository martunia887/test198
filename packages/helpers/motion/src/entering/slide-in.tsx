import React from 'react';
import { ObjectInterpolation } from '@emotion/core';
import { easeOut, easeIn } from '../utils/curves';
import { mediumDurationMs } from '../utils/durations';
import EnteringMotion, { EnteringMotionProps, Direction } from './motion';

export type From = 'top' | 'right' | 'bottom' | 'left';

export const slideInAnimation = (
  from: From,
  direction: Direction,
): ObjectInterpolation<undefined> => {
  const initial = direction === 'entering' ? '0%' : '100%';
  const end = direction === 'entering' ? '100%' : '0%';
  const fromMap = {
    top: 'translate3d(0, -100%, 0)',
    right: 'translate3d(100%, 0, 0)',
    bottom: 'translate3d(0, 100%, 0)',
    left: 'translate3d(-100%, 0, 0)',
  };

  return {
    [initial]: {
      transform: fromMap[from],
    },
    [end]: {
      transform: 'none',
    },
  };
};

interface SlideInProps extends EnteringMotionProps {
  /**
   * Direction the element will slide in from.
   * E.g. `"right"` will slide in from the right to the left.
   */
  from: From;
}

const SlideIn: React.FC<SlideInProps> = ({
  children,
  from,
  duration = mediumDurationMs,
}: SlideInProps) => {
  return (
    <EnteringMotion
      duration={duration}
      enteringAnimation={slideInAnimation(from, 'entering')}
      exitingAnimation={slideInAnimation(from, 'exiting')}
      animationTimingFunction={direction =>
        direction === 'entering' ? easeOut : easeIn
      }
    >
      {children}
    </EnteringMotion>
  );
};

export default SlideIn;
