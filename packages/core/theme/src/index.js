// @flow

export { default as getTheme } from './utils/getTheme';
export { default as themed } from './utils/themed';
export { default as Appearance } from './components/Appearance';

//TODO: Should probably be removed
export {
  borderRadius,
  gridSize,
  fontSize,
  fontSizeSmall,
  fontFamily,
  codeFontFamily,
  focusRing,
  noFocusRing,
  layers,
  assistive,
} from './constants';

// New API
export * from './components/Reset';
export { default } from './components/Theme';
export * from './hoc';
export * from './utils/createTheme';
