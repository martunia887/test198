import React from 'react';
import WidthDetector from '@atlaskit/width-detector';
import { browser } from '../../utils';
import { useInView } from './hooks';
import { ContextProps, Props } from './types';
import {
  IframeWidthDetector,
  IframeWidthDetectorWithUseInView,
} from './iframe-fallbacks';

export const {
  Provider: SwitchWidthDetectorProvider,
  Consumer,
} = React.createContext<ContextProps>({
  shouldUseOldWidthProvider: false,
  iframeWidthDetectorFallback: null,
});

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
      {({
        iframeGlobalSuffix,
        shouldUseOldWidthProvider,
        iframeWidthDetectorFallback,
      }) => {
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

        const {
          supportsResizeObserver,
          supportsIntersectionObserver,
        } = browser;

        if (!supportsResizeObserver) {
          if (!supportsIntersectionObserver) {
            return (
              <IframeWidthDetector
                iframeGlobalSuffix={iframeGlobalSuffix}
                iframeWidthDetectorFallback={iframeWidthDetectorFallback}
                setWidth={props.setWidth}
              >
                {props.children}
              </IframeWidthDetector>
            );
          }

          return (
            <IframeWidthDetectorWithUseInView
              iframeGlobalSuffix={iframeGlobalSuffix}
              iframeWidthDetectorFallback={iframeWidthDetectorFallback}
              setWidth={props.setWidth}
            >
              {props.children}
            </IframeWidthDetectorWithUseInView>
          );
        }

        return <NewWidthDetector {...props}>{props.children}</NewWidthDetector>;
      }}
    </Consumer>
  );
}
