import React, { FunctionComponent, useRef, useState, useEffect } from 'react';
import { useInView } from './hooks';
import { ContextProps, Props } from './types';
import { browser } from '../../utils';

type Unsubscribe = () => void;
type SubscriptionCallback = (callback: Function) => Unsubscribe;
type IframeContext = {
  subscribe: SubscriptionCallback | null;
};
type SubscribeProps = {
  subscribe: SubscriptionCallback;
} & Props;
type IframeWidthDetectorProps = {
  useIntersectionObserver: boolean;
} & Props &
  ContextProps;
type IframeProps = {
  onResize: () => void;
};

function Iframe(props: IframeProps) {
  const { onResize } = props;
  const ref = useRef<HTMLObjectElement>(null);

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    const { current: iframe } = ref;

    if (!iframe.contentDocument || !iframe.contentDocument.defaultView) {
      return;
    }

    const iframeWindow = iframe.contentDocument.defaultView;
    iframeWindow.addEventListener('resize', onResize);

    return () => {
      iframeWindow.removeEventListener('resize', onResize);
    };
  });

  return (
    <object
      ref={ref}
      data="about:blank"
      type="text/html"
      style={{ position: 'absolute', height: '0', width: '100%' }}
      aria-hidden
      tabIndex={-1}
    />
  );
}

const IframeWrapper: FunctionComponent = ({ children }) => (
  <div
    style={{
      position: 'relative',
      height: '0',
      width: '100%',
    }}
  >
    {children}
  </div>
);

const emptySubscription: SubscriptionCallback = () => () => {};

export const {
  Consumer: IframeWrapperConsumer,
  Provider: IframeWrapperProvider,
} = React.createContext<IframeContext>({
  subscribe: null,
});

const SubscribeIframeResize = React.memo(
  ({ subscribe, setWidth }: SubscribeProps) => {
    const ref = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (ref && ref.current) {
        const { current: target } = ref;
        const width = target.offsetWidth;
        setWidth(width);
      }

      const unsubscribe = subscribe(() => {
        if (ref && ref.current) {
          const { current: target } = ref;
          const width = target.offsetWidth;
          setWidth(width);
        }
      });

      return unsubscribe;
    });

    return <div ref={ref} />;
  },
);

const SubscribeIframeResizeWhenVisible = React.memo(
  ({ subscribe, setWidth }: SubscribeProps) => {
    const [inViewRef, inView, entry] = useInView({
      /* Optional options */
      threshold: 0,
    });

    useEffect(() => {
      if (inView && entry && entry.target instanceof HTMLElement) {
        const { target } = entry;
        const width = target.offsetWidth;
        setWidth(width);
      }

      const unsubscribe = subscribe(() => {
        if (inView && entry && entry.target instanceof HTMLElement) {
          const { target } = entry;
          const width = target.offsetWidth;

          setWidth(width);
        }
      });

      return unsubscribe;
    });

    return <div ref={inViewRef} />;
  },
);

function getSubscribeIframe(useIntersectionObserver: boolean) {
  if (useIntersectionObserver) {
    return SubscribeIframeResizeWhenVisible;
  }

  return SubscribeIframeResize;
}

export function IframeWidthDetector({
  setWidth,
  useIntersectionObserver,
}: IframeWidthDetectorProps) {
  const Component = getSubscribeIframe(useIntersectionObserver);

  return (
    <IframeWrapperConsumer>
      {({ subscribe }) => (
        <Component
          setWidth={setWidth}
          subscribe={subscribe || emptySubscription}
        />
      )}
    </IframeWrapperConsumer>
  );
}

const IframeWidthDetectorFallback = React.memo(
  (props: { children?: React.ReactNode }) => {
    const [listeners] = useState(new Map());
    const subscribe = React.useCallback(
      cb => {
        listeners.set(cb, null);
        return () => {
          listeners.delete(cb);
        };
      },
      [listeners],
    );

    const onResize = React.useCallback(() => {
      listeners.forEach((_, cb) => cb());
    }, [listeners]);

    return (
      <>
        <IframeWrapper>
          <Iframe onResize={onResize} />
        </IframeWrapper>

        <IframeWrapperProvider value={{ subscribe }}>
          {props.children}
        </IframeWrapperProvider>
      </>
    );
  },
);

export const IframeWidthDetectorFallbackWrapper = React.memo(
  (props: { children?: React.ReactNode }) => {
    const { supportsResizeObserver, supportsIntersectionObserver } = browser;

    if (supportsResizeObserver && supportsIntersectionObserver) {
      return <>{props.children}</>;
    }

    return (
      <IframeWidthDetectorFallback>
        {props.children}
      </IframeWidthDetectorFallback>
    );
  },
);
