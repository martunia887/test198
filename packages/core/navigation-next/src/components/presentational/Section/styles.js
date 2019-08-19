// @flow

import { colors, gridSize as gridSizeFn } from '@atlaskit/theme';

import type { ModeColors } from '../../../theme/types';
import type { SectionPresentationProps } from './types';

const gridSize = gridSizeFn();

const scrollHintHeight = 2;
const scrollHintSpacing = gridSize * 2;

const isGecko =
  typeof window !== 'undefined' &&
  window.navigator.userAgent.indexOf('Gecko') >= 0;
const isWebkit =
  typeof window !== 'undefined' &&
  window.navigator.userAgent.indexOf('AppleWebKit') >= 0;
const scrollBarSize = isGecko || isWebkit ? 0 : 30;

const getBaseStyles = ({
  alwaysShowScrollHint,
  allowNestedScroll,
}: SectionPresentationProps) => ({
  wrapper: {
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',

    '&::before': {
      borderRadius: 1,
      content: "''",
      display: 'block',
      flex: 0,
      height: `${scrollHintHeight}px`,
      left: `${scrollHintSpacing}px`,
      position: 'absolute',
      right: `${scrollHintSpacing + scrollBarSize}px`,
      top: 0,
      zIndex: 1,
    },

    '&::after': {
      borderRadius: 1,
      content: "''",
      display: 'block',
      flex: 0,
      height: `${scrollHintHeight}px`,
      left: `${scrollHintSpacing}px`,
      position: 'absolute',
      right: `${scrollHintSpacing + scrollBarSize}px`,
      bottom: 0,
      zIndex: 1,
    },
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    overflowY: 'auto',
    position: 'relative',

    '&::before': {
      borderRadius: 1,
      content: "''",
      display: alwaysShowScrollHint ? 'none' : 'block',
      flexShrink: 0,
      height: `${scrollHintHeight}px`,
      marginLeft: `${scrollHintSpacing}px`,
      position: 'relative',
      zIndex: 2,
    },

    '&::after': {
      borderRadius: 1,
      content: "''",
      display: 'block',
      flexShrink: 0,
      height: `${scrollHintHeight}px`,
      marginLeft: `${scrollHintSpacing}px`,
      marginTop: 'auto',
      position: 'relative',
      zIndex: 2,
    },
  },

  nestedScrollWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  // These styles are passed to the children function for the consumer to
  // apply
  children: {
    boxSizing: 'border-box',
    paddingLeft: allowNestedScroll ? 0 : `${gridSize * 2}px`,
    paddingRight: allowNestedScroll ? 0 : `${gridSize * 2}px`,
    display: allowNestedScroll ? 'flex' : 'block',
    flexDirection: allowNestedScroll ? 'column' : 'none',
    minHeight: allowNestedScroll ? '100%' : 'none',
  },
});

export default ({ product }: ModeColors) => (
  props: SectionPresentationProps,
) => {
  const baseStyles = getBaseStyles(props);
  return {
    container: {
      ...baseStyles,
      wrapper: {
        ...baseStyles.wrapper,
        '&::before': {
          ...baseStyles.wrapper['&::before'],
          backgroundColor: colors.N30A,
        },
        '&::after': {
          ...baseStyles.wrapper['&::after'],
          backgroundColor: colors.N30A,
        },
      },
      inner: {
        ...baseStyles.inner,
        '&::before': {
          ...baseStyles.inner['&::before'],
          backgroundColor: colors.N20,
        },
        '&::after': {
          ...baseStyles.inner['&::after'],
          backgroundColor: colors.N20,
        },
      },
    },
    product: {
      ...baseStyles,
      wrapper: {
        ...baseStyles.wrapper,
        '&::before': {
          ...baseStyles.wrapper['&::before'],
          backgroundColor: product.background.static,
        },
        '&::after': {
          ...baseStyles.wrapper['&::after'],
          backgroundColor: product.background.static,
        },
      },
      inner: {
        ...baseStyles.inner,
        '&::before': {
          ...baseStyles.inner['&::before'],
          backgroundColor: product.background.default,
        },
        '&::after': {
          ...baseStyles.inner['&::after'],
          backgroundColor: product.background.default,
        },
      },
    },
  };
};
