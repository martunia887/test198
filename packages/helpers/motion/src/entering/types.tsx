/**
 * Direction the motion is going.
 */
export type Direction = 'entering' | 'exiting';

/**
 * Direction an element can appear from
 */
export type From = 'top' | 'right' | 'bottom' | 'left';

/**
 * Common props all entering motions should make available for consumers.
 */
export interface MotionProps<TProps extends {}> {
  /**
   * Duration in `ms`.
   * How long the motion will take.
   */
  duration?: number;

  /**
   * Will callback when the motion has finished in the particular direction.
   * If it finished entering direction will be `entering`.
   * And vice versa for `exiting`.
   */
  onFinish?: (direction: Direction) => void;

  /**
   * Children as `function`.
   * Will be passed `props` for you to hook up.
   * The `direction` arg can be used to know if the motion is `entering` or `exiting`.
   */
  children: (opts: TProps, direction: Direction) => React.ReactNode;
}
