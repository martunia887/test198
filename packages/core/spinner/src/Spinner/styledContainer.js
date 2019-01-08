// @flow

import styled, { keyframes } from 'styled-components';
import type { SpinnerPhases } from '../types';
import { secondsDurations as durations } from './constants';

type AnimationParams = {
  delay: number,
  phase: SpinnerPhases,
};

/* Define keyframes statically to prevent a perfomance issue in styled components v1 where the keyframes function
 * does not cache previous values resulting in each spinner injecting the same keyframe definition
 * in the DOM.
 * This can be reverted to use dynamic keyframes when we upgrade to styled components v2
 */
const keyframeNames = {
  noop: keyframes`
    from { opacity: 0; }
    to { opacity: 0; }
  `,
  enterRotate: keyframes`
    from { transform: rotate(50deg); }
    to { transform: rotate(230deg); }
  `,
  leaveRotate: keyframes`
    from { transform: rotate(230deg); }
    to { transform: rotate(510deg); }
  `,
};

export const getContainerAnimation = ({ delay, phase }: AnimationParams) => {
  if (phase === 'OFF') {
    /* This hides the spinner and allows us to use animationend events to move to the next phase in
     * the same way we do with the other lifecycle stages */
    return `animation: ${delay}s ${keyframeNames.noop};`;
  }

  if (phase === 'ENTER' || phase === 'IDLE') {
    return `animation: ${durations.inAnimation} ease-in-out forwards ${
      keyframeNames.enterRotate
    };`;
  }

  if (phase === 'LEAVE') {
    return `animation: ${durations.outAnimation} ease-in-out forwards ${
      keyframeNames.leaveRotate
    };
    transition: opacity ${durations.outFade} ease-in-out ${
      durations.outFadeDelay
    };
    opacity: 0;`;
  }

  return '';
};

const getSize = ({ size }: { size: number }) => `${size}px`;

const Container = styled.div`
  ${getContainerAnimation} display: flex;
  height: ${getSize};
  width: ${getSize};
`;
Container.displayName = 'SpinnerContainer';
export default Container;
