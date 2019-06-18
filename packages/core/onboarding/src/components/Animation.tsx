import React, { ReactNode } from 'react';
import { Transition } from 'react-transition-group';

const duration = 100;
type Props = {
  in: boolean;
  children: (arg0: Object) => ReactNode;
  onExited?: () => any;
};

export const Fade = ({ in: hasEntered, children, onExited }: Props) => (
  <Transition
    in={hasEntered}
    timeout={duration}
    onExited={onExited}
    unmountOnExit
    appear
  >
    {status => {
      const base = {
        transition: `opacity ${duration}ms`,
        opacity: 0,
      };
      const anim = {
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
      };

      const style = { ...base, ...anim[status] };

      return children(style);
    }}
  </Transition>
);
