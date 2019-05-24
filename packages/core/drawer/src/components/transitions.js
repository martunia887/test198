// @flow

import React, { Component, type ComponentType } from 'react';
import { Transition } from 'react-transition-group';
import { layers } from '@atlaskit/theme';

import { transitionDurationMs, transitionTimingFunction } from '../constants';

// Transitions
// ------------------------------

type Styles = { [string]: string | number | null };

type TransitionProps = {
  children?: Node,
  component?: ComponentType<*> | string,
  onExited?: (node: HTMLElement) => void,
  openFromRight: boolean,
  shouldUnmountOnExit?: boolean,
  in: boolean,
};

type HandlerProps = {
  defaultStyles: Styles,
  transitionProps: {
    appear: boolean,
    mountOnEnter: boolean,
    unmountOnExit: boolean,
  },
  transitionStyles: {
    entering?: Styles,
    entered?: Styles,
    exiting?: Styles,
    exited?: Styles,
  },
};

const defaultTransitionProps = {
  appear: true,
  mountOnEnter: true,
  unmountOnExit: true,
};
class TransitionHandler extends Component<TransitionProps & HandlerProps> {
  static defaultProps = {
    component: 'div',
    transitionProps: defaultTransitionProps,
  };

  render() {
    const {
      component: Tag = 'div',
      in: inProp,
      onExited,
      defaultStyles,
      transitionStyles,
      transitionProps,
      ...props
    } = this.props;
    const timeout = { enter: 0, exit: transitionDurationMs };

    return (
      <Transition
        in={inProp}
        onExited={onExited}
        timeout={timeout}
        {...transitionProps}
      >
        {state => {
          const style = {
            ...defaultStyles,
            ...transitionStyles[state],
          };

          return <Tag style={style} {...props} />;
        }}
      </Transition>
    );
  }
}

export const Fade = ({ ...props }: TransitionProps) => (
  <TransitionHandler
    defaultStyles={{
      transition: `opacity ${transitionDurationMs}ms ${transitionTimingFunction}`,
      opacity: 0,
      position: 'fixed',
      zIndex: layers.blanket(),
    }}
    transitionStyles={{
      entering: { opacity: 0 },
      entered: { opacity: 1 },
    }}
    {...props}
  />
);

export const Slide = ({
  shouldUnmountOnExit = true,
  openFromRight,
  ...props
}: TransitionProps) => (
  <TransitionHandler
    openFromRight={openFromRight}
    defaultStyles={{
      transition:
        `transform ${transitionDurationMs}ms ${transitionTimingFunction}, ` +
        `width ${transitionDurationMs}ms ${transitionTimingFunction}`,
      transform: !openFromRight
        ? 'translate3d(-100%,0,0)'
        : 'translate3d(100%,0,0)',
      flexDirection: !openFromRight ? 'row' : 'row-reverse',
    }}
    transitionStyles={{
      // Unset transform so we do not create a new stacking context for fixed-position children - NAV-159
      entered: { transform: null },
      exited: {
        transform: !openFromRight
          ? 'translate3d(-100%,0,0)'
          : 'translate3d(100%,0,0)',
      },
    }}
    transitionProps={{
      ...defaultTransitionProps,
      ...{ unmountOnExit: shouldUnmountOnExit },
    }}
    {...props}
  />
);
