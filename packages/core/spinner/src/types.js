// @flow
type SpinnerSizes = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | number;

export type SpinnerProps = {
  /** Time in milliseconds after component mount before spinner is visible. */
  delay: number,
  /** Set the spinner color to white, for use in dark-themed UIs. */
  invertColor: boolean,
  /** Handler for once the spinner has completed its outro animation */
  /** Size of the spinner. */
  size: SpinnerSizes,
  /**
    Sets whether the spinner should be visible or not. Changing this value will trigger the transition animation.
    While the spinner is out, <Spinner /> will occupy no space on the page. This will likely be changed to
    `isCompleting` in a future breaking change.
  */
  isCompleting?: boolean,
  /** Handler for once the spinner has completed its outro animation */
  onComplete?: () => mixed,
};

export type SpinnerPhases = 'ENTER' | 'IDLE' | 'LEAVE' | 'OFF';

export type SpinnerState = {
  phase: SpinnerPhases,
};
