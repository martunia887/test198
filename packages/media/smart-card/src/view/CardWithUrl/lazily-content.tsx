import * as React from 'react';
import 'intersection-observer';
import handleViewport from 'react-in-viewport';

interface ReactInViewPortProps {
  inViewport: boolean;
  innerRef: any;
  enterCount: number;
  appearance: string;
}

export interface LazyContentProps extends ReactInViewPortProps {
  children?: React.ReactNode;
  placeholder?: React.ReactNode;
}

class LazyContentComponent extends React.Component<LazyContentProps> {
  render() {
    const {
      innerRef,
      appearance,
      inViewport,
      enterCount,
      children,
      placeholder,
    } = this.props;
    const element = appearance === 'inline' ? 'span' : 'div';

    if (inViewport || enterCount > 0) {
      return React.createElement(element, { ref: innerRef }, children || null);
    }
    return React.createElement(element, { ref: innerRef }, placeholder || null);
  }
}

export const LazyContent = handleViewport(
  LazyContentComponent,
  {},
  { disconnectOnLeave: true },
);
