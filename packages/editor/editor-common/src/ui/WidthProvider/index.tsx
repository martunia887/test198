import * as React from 'react';
import rafSchedule from 'raf-schd';
import WidthDetector from '@atlaskit/width-detector';

export const Breakpoints = {
  S: 'S',
  M: 'M',
  L: 'L',
};

const MAX_S = 1266;
const MAX_M = 2146;

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

export type WidthProviderState = {
  width?: number;
};

export class WidthProvider extends React.Component<any, WidthProviderState> {
  state = { width: 0 };

  constructor(props: any) {
    super(props);
    this.state.width = document.body.offsetWidth;
  }

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
            if (width) {
              this.setWidth(width);
            }
            return null;
          }}
        </WidthDetector>
        <Provider value={createWidthContext(this.state.width)}>
          {this.props.children}
        </Provider>
      </>
    );
  }

  setWidth = rafSchedule((width: number) => {
    if (this.state.width === width) {
      return;
    }
    this.setState({ width });
  });
}

export { Consumer as WidthConsumer };
