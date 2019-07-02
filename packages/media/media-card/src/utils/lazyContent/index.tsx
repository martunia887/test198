import * as React from 'react';
import 'intersection-observer';
import handleViewport from 'react-in-viewport';
import { Wrapper } from './styled';

interface ReactInViewPortProps {
  inViewport: boolean;
  innerRef: any;
  enterCount: number;
}

export interface LazyContentProps extends ReactInViewPortProps {
  children?: React.ReactNode;
}

export class LazyContentComponent extends React.Component<LazyContentProps> {
  render() {
    const { innerRef } = this.props;

    return <Wrapper ref={innerRef}>{this.props.children}</Wrapper>;
  }
}

export const LazyContent = handleViewport(
  LazyContentComponent,
  {},
  { disconnectOnLeave: true },
);
