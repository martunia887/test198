import React, { Component, ComponentType } from 'react';
import { Transition } from 'react-transition-group';
import { layers } from '@atlaskit/theme/constants';

import { transitionDurationMs, transitionTimingFunction } from '../constants';

// Transitions
// ------------------------------

type Styles = { [index: string]: string | number | null };

interface TransitionProps {
  component?: ComponentType<any> | string;
  onExited?: (node: HTMLElement) => void;
  shouldUnmountOnExit?: boolean;
  in: boolean;
}

interface HandlerProps {
  defaultStyles: Styles;
  transitionProps: {
    appear: boolean;
    mountOnEnter: boolean;
    unmountOnExit: boolean;
  };
  transitionStyles: {
    entering?: Styles;
    entered?: Styles;
    exiting?: Styles;
    exited?: Styles;
  };
}

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
      component = 'div',
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
        {(state: keyof HandlerProps['transitionStyles']) => {
          const style = {
            ...defaultStyles,
            ...transitionStyles[state],
          };

          const Tag: ComponentType<any> | string = component;

          return <Tag style={style} {...props} />;
        }}
      </Transition>
    );
  }
}

export const Fade: React.StatelessComponent<TransitionProps> = ({
  ...props
}) => (
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

export const Slide: React.StatelessComponent<TransitionProps> = ({
  shouldUnmountOnExit = true,
  ...props
}) => (
  <TransitionHandler
    defaultStyles={{
      transition:
        `transform ${transitionDurationMs}ms ${transitionTimingFunction}, ` +
        `width ${transitionDurationMs}ms ${transitionTimingFunction}`,
      transform: 'translate3d(-100%,0,0)',
    }}
    transitionStyles={{
      // Unset transform so we do not create a new stacking context for fixed-position children - NAV-159
      entered: { transform: null },
      exited: { transform: 'translate3d(-100%,0,0)' },
    }}
    transitionProps={{
      ...defaultTransitionProps,
      ...{ unmountOnExit: shouldUnmountOnExit },
    }}
    {...props}
  />
);
