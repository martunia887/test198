import * as React from 'react';
import { MarginWrapperSquare, MarginWrapperCircle } from './styled';

export interface MarginProps {
  width: number;
  height: number;
  size: number;
  isCircular: boolean;
  constrain: boolean;
}

export interface MarginState {}

export class Margin extends React.Component<MarginProps, MarginState> {
  render() {
    const { width, height, size, isCircular, constrain } = this.props;
    const Element = isCircular ? MarginWrapperCircle : MarginWrapperSquare;

    return (
      <Element
        width={width}
        height={height}
        size={size}
        constrain={constrain}
      />
    );
  }
}
