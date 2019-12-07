import React from 'react';
import WidthDetector from '@atlaskit/width-detector';

export const {
  Provider: SwitchWidthDetectorProvider,
  Consumer,
} = React.createContext({
  shouldUseOldWidthProvider: false,
});

type Props = {
  setWidth: (width: number) => void;
  children: React.ReactNode;
};

type Response = [
  (node?: Element | null) => void,
  boolean,
  IntersectionObserverEntry | undefined,
];

type State = {
  inView: boolean;
  entry?: IntersectionObserverEntry;
};

function useInView(options: IntersectionObserverInit = {}): Response {
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

function NewWidthDetector({ setWidth, children }: Props) {
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

  return <div ref={inViewRef}>{children}</div>;
}

export function SwitchWidthDetector(props: Props) {
  return (
    <Consumer>
      {({ shouldUseOldWidthProvider }) => {
        if (shouldUseOldWidthProvider) {
          return (
            <>
              <WidthDetector
                containerStyle={{
                  height: '0',
                  borderStyle: 'none',
                }}
              >
                {width => {
                  if (width) {
                    props.setWidth(width);
                  }
                  return null;
                }}
              </WidthDetector>
              {props.children}
            </>
          );
        }

        return <NewWidthDetector {...props}>{props.children}</NewWidthDetector>;
      }}
    </Consumer>
  );
}
