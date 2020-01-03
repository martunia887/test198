import { CSSObject } from '@emotion/core';
import { gridSize as gridSizeFn } from '@atlaskit/theme/constants';
import { N30 } from '@atlaskit/theme/colors';

const gridSize = gridSizeFn();

export const menuGroupCSS = (maxHeight?: string | number): CSSObject => ({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  maxHeight,
});

export const sectionCSS = (
  isScrollable?: boolean,
  hasBottomSeparator?: boolean,
): CSSObject => {
  const topBottomPadding = gridSize * 1.5;

  return {
    paddingTop: topBottomPadding,
    ...(hasBottomSeparator && { borderBottom: `2px solid ${N30}` }),
    ...(isScrollable
      ? {
          flexShrink: 1,
          overflow: 'auto',
        }
      : { flexShrink: 0 }),
    '&:focus': {
      // NOTE: Firefox allows elements that have "overflow: auto" to gain focus (as if it had tab-index="0")
      // We have made a deliberate choice to leave this behaviour as is.
      // This makes the outline go inside by 1px so it can actually be displayed
      // else it gets cut off from the overflow: scroll from the parent menu group.
      outlineOffset: -1,
    },
    '&::after': {
      // This pseudo element will add extra spacing so we get the illusion of a bottom padding.
      // Unfortunately using overflow hidden without this it is cut off short.
      // See: https://stackoverflow.com/questions/8981811/overflowhidden-ignoring-bottom-padding
      // for more information about this problem.
      content: "''",
      display: 'block',
      height: 0,
    },
    '&[data-bottom-separator="true"]::after': {
      height: topBottomPadding,
    },
    '&[data-bottom-separator="false"] + [data-bottom-separator="false"]': {
      paddingTop: 0,
    },
    '&[data-bottom-separator="false"] + [data-bottom-separator="true"]': {
      paddingTop: 0,
    },
    ':last-child': {
      borderBottom: 0,

      '&::after': {
        height: topBottomPadding,
      },
    },
  };
};
