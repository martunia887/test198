// @flow

import React, { PureComponent, type Node } from 'react';
import Transition from 'react-transition-group/Transition';
import type { CollapseListener } from './types';

const DURATION = 300;

const createWillChange = property => ({
  willChange: toKebabCase(property),
});

const createTransition = ({ property, userIsDragging, isMounted }) => {
  if (!userIsDragging && isMounted) {
    const kebabCaseProperty = toKebabCase(property);
    return {
      transition: `${kebabCaseProperty} ${DURATION}ms cubic-bezier(0.2, 0, 0, 1)`,
    };
  }
  return {};
};

const createPropertyValueByState = ({ property, from, to }) => ({
  exiting: { [property]: from },
  exited: { [property]: from },
  entering: { [property]: to },
  entered: { [property]: to },
});

const createTransform = transitionState =>
  isTransitioning(transitionState) ? { transform: 'translate3d(0, 0, 0)' } : {};

const toKebabCase = (property: propertyType): 'padding-left' | 'width' =>
  ({ paddingLeft: 'padding-left', width: 'width' }[property]);

export const isTransitioning = (state: TransitionState) =>
  ['entering', 'exiting'].includes(state);

function NOOP() {}

type propertyType = 'paddingLeft' | 'width';
export type TransitionState = 'entered' | 'entering' | 'exited' | 'exiting';
export type TransitionStyle = {
  [propertyType]: number,
  willChange: 'width' | 'padding-left',
  transition?: string,
  transform?: string,
};
type Props = {
  children: ({
    transitionStyle: TransitionStyle,
    transitionState: TransitionState,
  }) => Node,
  innerRef?: HTMLElement => any,
  in: boolean,
  userIsDragging: boolean,
  property: propertyType,
  from: number,
  to: number,
  onExpandStart: CollapseListener,
  onExpandEnd: CollapseListener,
  onCollapseStart: CollapseListener,
  onCollapseEnd: CollapseListener,
};

export default class ResizeTransition extends PureComponent<Props> {
  target: HTMLElement;
  static defaultProps = {
    onExpandStart: NOOP,
    onExpandEnd: NOOP,
    onCollapseStart: NOOP,
    onCollapseEnd: NOOP,
  };

  isMounted = false;

  componentDidMount() {
    this.isMounted = true;
  }

  getTarget = (ref: HTMLElement) => {
    this.target = ref;

    const { innerRef } = this.props;
    if (innerRef) innerRef(ref);
  };

  render() {
    const {
      from,
      onExpandStart,
      onExpandEnd,
      onCollapseStart,
      onCollapseEnd,
      property,
      to,
      userIsDragging,
      in: inProp,
    } = this.props;
    return (
      <Transition
        onEntering={onExpandStart}
        onEntered={onExpandEnd}
        onExiting={onCollapseStart}
        onExited={onCollapseEnd}
        in={inProp}
        timeout={this.isMounted ? DURATION : 0}
      >
        {(transitionState: TransitionState) => {
          // transitions interupt manual resize behaviour
          const cssTransition = createTransition({
            property,
            userIsDragging,
            isMounted: this.isMounted,
          });

          // `from` and `to` styles tweened by the transition
          const propertyValueByState = createPropertyValueByState({
            property,
            from,
            to,
          });

          // due to the use of 3d transform for GPU acceleration, which
          // changes the stacking context, we only apply the transform during
          // the animation period.
          const gpuAcceleration = createTransform(transitionState);

          // let the browser know what we're up to
          const willChange = createWillChange(property);

          // put it all together
          const transitionStyle: TransitionStyle = {
            ...willChange,
            ...cssTransition,
            ...gpuAcceleration,
            ...propertyValueByState[transitionState],
          };

          return this.props.children({
            transitionStyle, // consumers must apply `transitionStyle`
            transitionState, // lets consumers react to the current state
          });
        }}
      </Transition>
    );
  }
}
