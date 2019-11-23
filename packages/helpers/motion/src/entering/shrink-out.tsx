import React, { useLayoutEffect } from 'react';
import { useExitingPersistence, Direction } from './exiting-persistence';
import { useElementRef } from '../utils/use-element-ref';
import { useRequestAnimationFrame, useSetTimeout } from '../utils/timer-hooks';
import { smallDurationMs } from '../utils/durations';
import { easeIn } from '../utils/curves';

interface ActiveMotionProps {
  /**
   * Duration in `ms`.
   * How long the motion will take.
   */
  duration?: number;

  /**
   * Children as `function`.
   * Will be passed `props` for you to hook up.
   * The `direction` arg can be used to know if the motion is `entering` or `exiting`.
   */
  children: (
    opts: { ref: React.Ref<any> },
    direction: Direction,
  ) => React.ReactNode;
}

const ShrinkOut: React.FC<ActiveMotionProps> = ({
  children,
  duration = smallDurationMs,
}: ActiveMotionProps): any => {
  const [element, setElementRef] = useElementRef();
  const exiting = useExitingPersistence();
  const requestAnimationFrame = useRequestAnimationFrame();
  const setTimeout = useSetTimeout();
  const direction = exiting.isExiting ? 'exiting' : 'entering';

  useLayoutEffect(() => {
    if (exiting.isExiting && element) {
      element.style.width = `${element.offsetWidth}px`;
      element.style.boxSizing = 'border-box';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.style.transitionTimingFunction = easeIn;
          element.style.transitionDuration = `${duration}ms`;
          element.style.transitionProperty = 'width,margin';
          element.style.width = '0px';
          element.style.margin = '0px';

          setTimeout(() => {
            exiting.onFinish && exiting.onFinish();
          }, duration);
        });
      });
    }
  });

  return children({ ref: setElementRef }, direction);
};

export default ShrinkOut;
