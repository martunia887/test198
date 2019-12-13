import React from 'react';
import { useInView } from './hooks';
import { Props } from './types';

export const WidthDetectorObsever = React.memo(({ setWidth }: Props) => {
  const [inViewRef, inView, entry] = useInView({
    /* Optional options */
    threshold: 0,
  });
  const observer = React.useRef(
    new ResizeObserver(entries => {
      const { width } = entries[0].contentRect;

      setWidth(width);
    }),
  );

  React.useEffect(() => {
    const { current: currentObserver } = observer;

    if (entry && entry.target) {
      if (inView) {
        currentObserver.observe(entry.target);
      } else {
        currentObserver.unobserve(entry.target);
      }
    }

    return () => {
      // @ts-ignore
      currentObserver.disconnect();
    };
  }, [entry, inView]);

  return <div ref={inViewRef} />;
});
