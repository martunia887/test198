import React, { useLayoutEffect } from 'react';
import { useExitingPersistence } from './exiting-persistence';
import { MotionProps } from './types';
import { useElementRef } from '../utils/use-element-ref';
import { useRequestAnimationFrame, useSetTimeout } from '../utils/timer-hooks';
import { smallDurationMs } from '../utils/durations';
import { easeIn } from '../utils/curves';

interface ShrinkOutProps extends MotionProps<{ ref: React.Ref<any> }> {}

const ShrinkOut: React.FC<ShrinkOutProps> = ({
  children,
  duration = smallDurationMs,
  onFinish,
}: ShrinkOutProps): any => {
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
            onFinish && onFinish('exiting');
          }, duration);
        });
      });
    }
  });

  return children({ ref: setElementRef }, direction);
};

export default ShrinkOut;
