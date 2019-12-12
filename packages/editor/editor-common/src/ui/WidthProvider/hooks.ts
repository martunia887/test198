import React from 'react';

type Response = [
  (node?: Element | null) => void,
  boolean,
  IntersectionObserverEntry | undefined,
];

type State = {
  inView: boolean;
  entry?: IntersectionObserverEntry;
};

export function useInView(options: IntersectionObserverInit = {}): Response {
  const ref = React.useRef<Element>();
  const [state, setState] = React.useState<State>({
    inView: false,
    entry: undefined,
  });
  const { threshold, root, rootMargin } = options;

  const setRef = React.useCallback(
    node => {
      const currentObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries &&
            entries.forEach(intersection => {
              const { isIntersecting, intersectionRatio } = intersection;

              if (intersectionRatio >= 0) {
                let inView = intersectionRatio >= (threshold || 0);

                if (isIntersecting !== undefined) {
                  inView = inView && isIntersecting;
                }

                setState({ inView, entry: intersection });
              }
            });
        },
        {
          threshold,
          root,
          rootMargin,
        },
      );

      if (ref.current) {
        currentObserver.unobserve(ref.current);
      }

      if (node) {
        currentObserver.observe(node);
      }

      // Store a reference to the node
      ref.current = node;
    },
    [threshold, root, rootMargin],
  );

  return [setRef, state.inView, state.entry];
}
