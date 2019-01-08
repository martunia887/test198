// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

import { SIZES_MAP, DEFAULT_SIZE, durations } from './constants';
import Container from './styledContainer';
import Svg from './styledSvg';
import type { SpinnerProps, SpinnerState } from '../types';

const Outer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;
Outer.displayName = 'Outer';

type Mode = 'hidden' | 'visible';
type Machine = {
  hidden: {
    hidden: Function,
    visible: Function,
  },
  visible: {
    hidden: Function,
    visible: () => Promise<any>,
  },
};

const noop = () => Promise.resolve();

export default class Spinner extends Component<SpinnerProps, SpinnerState> {
  static defaultProps = {
    delay: 100,
    invertColor: false,
    size: 'medium',
    isCompleting: true,
  };

  state = { phase: 'OFF' };

  transitionNode: ?HTMLElement;
  /*
    Hi, let's talk about what's happening here:

    We have a custome state machine, with its states referred to as 'modes' to attempt
    to avoid confusion.

    - There are two modes: visible or hidden.
    - There is a transition between each mode.
    - While a transition is in progress, no mode change is observed
    - Once a transition finishes, we recheck what the next intended mode is, and if it
      is not our current mode, we enter another transition.

    This means that:
    - All animations finish before we start a new animation
    - If you go visible (trigger animation) -> hidden -> visible before the entry animation
      finishes, it finishes the animation, is in the correct current mode, and does not retrigger renders.

    CODE CHOICES FOR THIS
    Things to do with the state machine are: currentMode, nextMode, animationInProgress, timeout, and machine
    These are NOT stored in react state as they are not intended to trigger renders, and want to reference
    updated information as a side-effect.
    Our state machine is responsible for updating the react state of `phase`, which is used for display elements.

    We're fairly sure that this can be simplified with hooks.
  */
  timeout = null;
  currentMode: Mode = 'hidden';
  nextMode: Mode = 'hidden';
  animationInProgress: boolean = false;
  machine: Machine = {
    hidden: {
      hidden: noop,
      visible: () => {
        const { delay } = this.props;
        // When we enter the isVisible state, we first wait the delay provided, then
        // trigger the entry animation, then set state to idle once the entry animation is done.
        return new Promise(resolve => {
          this.timeout = setTimeout(() => {
            this.setState({ phase: 'ENTER' });
            this.timeout = setTimeout(() => {
              this.setState({ phase: 'IDLE' });
              resolve();
            }, durations.inAnimation);
          }, delay);
        });
      },
    },
    visible: {
      hidden: () => {
        this.setState({ phase: 'LEAVE' });
        const { onComplete } = this.props;
        return new Promise(resolve => {
          this.timeout = setTimeout(() => {
            this.setState({ phase: 'OFF' });
            if (onComplete) onComplete();
            resolve();
          }, durations.outAnimation);
        });
      },
      visible: noop,
    },
  };

  setMode(newMode: Mode) {
    this.nextMode = newMode;
    if (!this.animationInProgress) {
      this.modeChange();
    }
  }

  modeChange() {
    this.animationInProgress = true;
    const transitionFunction = this.machine[this.currentMode][this.nextMode];
    this.currentMode = this.nextMode;
    transitionFunction().then(() => {
      this.animationInProgress = false;
      if (this.currentMode !== this.nextMode) {
        this.modeChange();
      }
    });
  }

  componentDidMount() {
    if (this.props.isCompleting) this.setMode('visible');
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  componentDidUpdate() {
    const newPhase = this.props.isCompleting ? 'visible' : 'hidden';
    this.setMode(newPhase);
  }

  validateSize = () => {
    const { size } = this.props;
    const spinnerSize = SIZES_MAP[size] || size;
    return typeof spinnerSize === 'number' ? spinnerSize : DEFAULT_SIZE;
  };

  render() {
    const { phase } = this.state;
    const { invertColor } = this.props;
    const size = this.validateSize();

    const strokeWidth = Math.round(size / 10);
    const strokeRadius = size / 2 - strokeWidth / 2;
    return phase !== 'OFF' ? (
      <Outer>
        <Container phase={phase} size={size}>
          <Svg
            focusable="false"
            height={size}
            invertColor={invertColor}
            phase={phase}
            size={size}
            viewBox={`0 0 ${size} ${size}`}
            width={size}
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx={size / 2} cy={size / 2} r={strokeRadius} />
          </Svg>
        </Container>
      </Outer>
    ) : null;
  }
}
