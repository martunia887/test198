import * as React from 'react';
import WidthDetector from '@atlaskit/width-detector';

export const Breakpoints = {
  S: 'S',
  M: 'M',
  L: 'L',
};

const MAX_S = 1266;
const MAX_M = 2146;

// TODO: should we initialize here with document.body.offsetWidth ?
export function getBreakpoint(width: number = 0) {
  if (width >= MAX_S && width < MAX_M) {
    return Breakpoints.M;
  } else if (width >= MAX_M) {
    return Breakpoints.L;
  }
  return Breakpoints.S;
}

export function createWidthContext(width: number = 0) {
  return { width, breakpoint: getBreakpoint(width) };
}

const { Provider, Consumer } = React.createContext(createWidthContext());

export type WidthProviderProps = {
  children: React.ReactNode;
};

export class WidthProvider extends React.Component<WidthProviderProps, {}> {
  render() {
    return (
      <>
        <WidthDetector
          containerStyle={{
            height: '0',
            borderStyle: 'none',
          }}
        >
          {width => {
            // TODO: add rafSchedule here
            if (width !== undefined) {
              return (
                <Provider value={createWidthContext(width)}>
                  {this.props.children}
                </Provider>
              );
            }
            return null;
          }}
        </WidthDetector>
      </>
    );
  }
}

export { Consumer as WidthConsumer };
