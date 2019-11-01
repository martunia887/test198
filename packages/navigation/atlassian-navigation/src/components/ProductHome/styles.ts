import { gridSize as gridSizeFn } from '@atlaskit/theme';
import { PRODUCT_HOME_BREAKPOINT } from '../../common/constants';
import { skeletonCSS } from '../../common/styles';
import { NavigationTheme } from '../../theme';

const gridSize = gridSizeFn();

export const containerCSS = {
  alignItems: 'center',
  display: 'flex',
  [`@media (max-width: ${PRODUCT_HOME_BREAKPOINT - 1}px)`]: {
    margin: `0 ${gridSize}px`,
  },
  [`@media (min-width: ${PRODUCT_HOME_BREAKPOINT}px)`]: {
    margin: `0 ${gridSize * 2}px`,
  },
};

export const containerSkeletonCSS = containerCSS;

const height = 40;

const heightCSS = {
  height: `${height}px`,
};

export const productIconCSS = {
  // Ensure anything passed into
  // productHome is aligned correctly
  '& > *': {
    display: 'flex',
  },
  [`@media (min-width: ${PRODUCT_HOME_BREAKPOINT}px)`]: {
    display: 'none',
  },
};

const iconHeight = 28;

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
  },
  [`@media (max-width: ${PRODUCT_HOME_BREAKPOINT - 1}px)`]: {
    display: 'none',
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
  marginRight: gridSize * 1.5,
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
    height: height / 2,
    backgroundColor: theme.mode.skeleton.backgroundColor,
    borderRadius: 4,
  },
});

export const productLogoSkeletonCSS = (theme: NavigationTheme) => ({
  width: '120px',
  ...heightCSS,
  ...productLogoCSS,
  ...skeletonCSS(theme),
});

export const customProductLogoCSS = {
  ...heightCSS,
  ...productLogoCSS,
};
