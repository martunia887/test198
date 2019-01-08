// @flow
export const SIZES_MAP = {
  xsmall: 8,
  small: 16,
  medium: 24,
  large: 48,
  xlarge: 96,
};
export const DEFAULT_SIZE = SIZES_MAP.small;

const inAnimation = 1000;
const outAnimation = 530;
const outFadeDelay = 200;
const outFade = outAnimation - outFadeDelay;

export const durations: {
  inAnimation: number,
  outAnimation: number,
  outFadeDelay: number,
  outFade: number,
} = {
  inAnimation,
  outAnimation,
  outFadeDelay,
  outFade,
};

export const secondsDurations: {
  inAnimation: string,
  outAnimation: string,
  outFadeDelay: string,
  outFade: string,
  // $ExpectError - flow is very bad at tracing types through these transforms
} = Object.entries(durations).reduce(
  // $ExpectError - flow is very bad at tracing types through these transforms
  (acc, [key, milliseconds]) => ({ ...acc, [key]: `${milliseconds / 1000}s` }),
  {},
);
