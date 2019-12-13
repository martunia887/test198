import React from 'react';
import WidthDetector from '@atlaskit/width-detector';
import { browser } from '../../utils';
import { ContextProps, Props } from './types';
import { IframeWidthDetector } from './iframe-fallbacks';
import { WidthDetectorObsever } from './width-detector-observer';

const { Provider: SwitchWidthDetectorProvider, Consumer } = React.createContext<
  ContextProps
>({
  useResizeObserverWidthProvider: false,
});

export const SwitchWidthDetector = React.memo((props: Props) => {
  return (
    <Consumer>
      {({ useResizeObserverWidthProvider }) => {
        if (!useResizeObserverWidthProvider) {
          return (
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
          );
        }

        const {
          supportsResizeObserver,
          supportsIntersectionObserver,
        } = browser;

        if (!supportsResizeObserver) {
          return (
            <IframeWidthDetector
              setWidth={props.setWidth}
              useIntersectionObserver={supportsIntersectionObserver}
            />
          );
        }

        return <WidthDetectorObsever setWidth={props.setWidth} />;
      }}
    </Consumer>
  );
});

export { SwitchWidthDetectorProvider };
