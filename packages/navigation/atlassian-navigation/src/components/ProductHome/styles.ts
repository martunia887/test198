import { CSSObject } from '@emotion/core';
import { gridSize as gridSizeFn } from '@atlaskit/theme';
import { PRODUCT_HOME_BREAKPOINT } from '../../common/constants';
import { skeletonCSS } from '../../common/styles';
import { NavigationTheme } from '../../theme';

const gridSize = gridSizeFn();

export const containerCSS = ({
  mode: { productHome },
}: NavigationTheme): CSSObject => {
  return {
    alignItems: 'center',
    padding: gridSize / 2,
    borderRadius: 3,
    border: 0,
    background: 'none',
    display: 'flex',
    cursor: 'pointer',
    color: 'inherit',
    '&::-moz-focus-inner': {
      border: 0,
    },
    '&:hover': productHome.hover,
    '&:focus': { ...(productHome.focus as CSSObject), outline: 0 },
    '&:active': productHome.active,
    'div&': {
      pointerEvents: 'none',
    },
    [`@media (max-width: ${PRODUCT_HOME_BREAKPOINT - 1}px)`]: {
      margin: `0 ${gridSize}px`,
    },
    [`@media (min-width: ${PRODUCT_HOME_BREAKPOINT}px)`]: {
      margin: `0 ${gridSize * 2}px`,
    },
  };
};

export const containerSkeletonCSS = containerCSS;

const iconHeight = 28;

const heightCSS = {
  maxHeight: `${iconHeight}px`,
};

export const productIconCSS = {
  // Ensure anything passed into
  // productHome is aligned correctly
  '& > *': {
    display: 'flex',
    height: `${iconHeight}px`,
  },
  [`@media (min-width: ${PRODUCT_HOME_BREAKPOINT}px)`]: {
    display: 'none',
  },
};

export const productIconSkeletonCSS = (theme: NavigationTheme) => ({
  borderRadius: '50%',
  width: `${iconHeight}px`,
  height: `${iconHeight}px`,
  ...productIconCSS,
  ...skeletonCSS(theme),
});

export const customProductIconCSS = {
  ...heightCSS,
  ...productIconCSS,
};

export const productLogoCSS = {
  // Ensure anything passed into
  // productHome is aligned correctly
  '& > *': {
    display: 'flex',
    height: `${iconHeight}px`,
  },
  [`@media (max-width: ${PRODUCT_HOME_BREAKPOINT - 1}px)`]: {
    display: 'none',
  },
  // Continue to display custom logo
  // if custom icon is missing.
  '&:only-child': {
    display: 'flex',
  },
};

export const siteTitleCSS = ({
  mode: {
    navigation: { color },
    productHome: { borderRight },
  },
}: NavigationTheme) => ({
  marginLeft: `${gridSize * 0.5}px`,
  display: 'flex',
  alignItems: 'center',

  paddingRight: gridSize * 3,
  marginRight: gridSize / 2,
  borderRight: borderRight,
});

export const siteTitleSkeletonCSS = (theme: NavigationTheme) => ({
  ...siteTitleCSS(theme),
  ...skeletonCSS(theme),
  width: gridSize * 5,
  backgroundColor: 'transparent',

  '&:after': {
    content: '""',
    width: '100%',
    height: iconHeight / 2,
    backgroundColor: theme.mode.skeleton.backgroundColor,
    borderRadius: 4,
  },
});

export const productLogoSkeletonCSS = (theme: NavigationTheme) => ({
  width: '120px',
  height: iconHeight,
  ...heightCSS,
  ...productLogoCSS,
  ...skeletonCSS(theme),
});

export const customProductLogoCSS = {
  ...heightCSS,
  ...productLogoCSS,
};
