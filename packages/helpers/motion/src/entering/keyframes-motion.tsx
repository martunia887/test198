import React, { Ref, useEffect } from 'react';
import { ClassNames, keyframes, ObjectInterpolation } from '@emotion/core';

import { prefersReducedMotion } from '../utils/accessibility';
import { largeDurationMs } from '../utils/durations';
import { useSetTimeout } from '../utils/timer-hooks';

import { useExitingPersistence } from './exiting-persistence';
import { useStaggeredEntrance } from './staggered-entrance';
import { MotionProps, Direction } from './types';

/**
 * These are props that motions should use as their external props for consumers.
 * See [FadeIn](packages/helpers/motion/src/entering/fade-in.tsx) for an example usage.
 */
export interface KeyframesMotionProps
  extends MotionProps<{ className: string; ref: Ref<any> }> {
  /**
   * Can be used to pause the animation before it has finished.
   */
  isPaused?: boolean;
}

interface InternalKeyframesMotionProps extends KeyframesMotionProps {
  /**
   * Timing function to be used with the animation.
   * Receives the `direction` and expects a `string` return value.
   * Useful if you want a different curve when entering vs. exiting.
   */
  animationTimingFunction: (direction: Direction) => string;

  /**
   * CSS keyframes for the entering animation.
   */
  enteringAnimation: ObjectInterpolation<undefined>;

  /**
   * CSS keyframes for the exiting animation.
   */
  exitingAnimation?: ObjectInterpolation<undefined>;

  /**
   * Duration in `ms`.
   * How long the motion will take.
   */
  duration: number;
}

/**
 * Used to multipy the initial duration for exiting motions.
 */
const EXITING_MOTION_MULTIPLIER = 0.5;

/**
 * This is the base INTERNAL component used for all other entering motions.
 * This does not need Javascript to execute on the client so it will run immediately
 * for any SSR rendered React apps before the JS has executed.
 */
const EnteringMotion: React.FC<InternalKeyframesMotionProps> = ({
  children,
  animationTimingFunction,
  enteringAnimation,
  exitingAnimation,
  isPaused,
  onFinish: onFinishMotion,
  duration = largeDurationMs,
}: InternalKeyframesMotionProps) => {
  const staggered = useStaggeredEntrance();
  const {
    isExiting,
    onFinish: onExitFinished,
    appear,
  } = useExitingPersistence();
  const setTimeout = useSetTimeout();
  const paused = isPaused || !staggered.isReady;
  const delay = isExiting ? 0 : staggered.delay;
  const direction = isExiting ? 'exiting' : 'entering';
  const actualDuration = appear === false ? 0 : duration;

  useEffect(() => {
    if (paused) {
      return;
    }

    setTimeout(
      () => {
        if (direction === 'exiting') {
          onExitFinished && onExitFinished();
        }

        onFinishMotion && onFinishMotion(direction);
      },
      isExiting
        ? actualDuration * EXITING_MOTION_MULTIPLIER
        : actualDuration + delay,
    );
    // We ignore this for onFinishMotion as consumers could potentially inline the function
    // which would then trigger this effect every re-render.
    // We want to make it easier for consumers so we go down this path unfortunately.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    onExitFinished,
    direction,
    isExiting,
    actualDuration,
    delay,
    paused,
    setTimeout,
  ]);

  return (
    <ClassNames>
      {({ css }) =>
        children(
          {
            ref: staggered.ref,
            className: css({
              animationName: `${keyframes(
                isExiting
                  ? exitingAnimation || enteringAnimation
                  : enteringAnimation,
              )}`,
              animationTimingFunction: animationTimingFunction(direction),
              animationDelay: `${delay}ms`,
              animationFillMode: isExiting ? 'forwards' : 'backwards',
              animationDuration: `${
                isExiting
                  ? actualDuration * EXITING_MOTION_MULTIPLIER
                  : actualDuration
              }ms`,
              animationPlayState: paused ? 'paused' : 'running',
              ...prefersReducedMotion(),
            }),
          },
          direction,
        )
      }
    </ClassNames>
  );
};

export default EnteringMotion;
