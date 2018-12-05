import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const pulseBackground = keyframes`
  50% {
    background-color: hotpink;
  }
`;

const pulseBackgroundReverse = keyframes`
  0% {
    background-color: hotpink;
  }
  50% {
    background-color: auto;
  }
  100% {
    background-color: hotpink;
  }
`;

const Wrapper: any = styled.div`
  &.-flash > div {
    animation: 0.25s ease-in-out ${pulseBackgroundReverse};
  }

  & > div {
    animation: ${(props: Props) =>
      props.animate ? `.25s ease-in-out ${pulseBackground}` : 'none'};
  }
`;

export interface Props {
  animate: boolean;
  children?: any;
}

export default class WithFlash extends React.Component<Props> {
  private toggle = false;

  render() {
    const { animate, children } = this.props;
    this.toggle = animate && !this.toggle;

    return (
      <Wrapper className={this.toggle ? '-flash' : ''} animate={animate}>
        {children}
      </Wrapper>
    );
  }
}
