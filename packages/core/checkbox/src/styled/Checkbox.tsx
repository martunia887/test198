/** @jsx jsx */
import { jsx } from '@emotion/core';
import { colors, math, gridSize } from '@atlaskit/theme';
import { ThemeTokens, ThemeIconTokens } from '../types';
import React from 'react';

export const HiddenCheckbox = React.forwardRef((
  // @ts-ignore - createAnalyticsEvent is injected from WithAnalyticsEvents HOC
  { createAnalyticsEvent, ...props }: React.HTMLProps<HTMLInputElement>,
  ref: React.Ref<HTMLInputElement>,
) => (
  <input
    ref={ref}
    css={css`
      left: 50%;
      margin: 0;
      opacity: 0;
      padding: 0;
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
    `}
    {...props}
  />
));

<<<<<<< HEAD
const disabledColor = themed({ light: colors.N80, dark: colors.N80 });

=======
>>>>>>> 56f01cf1a3... fix checkbox type definitions
interface Props {
  isActive?: boolean;
  isChecked?: boolean | unknown;
  isDisabled?: boolean;
  isFocused?: boolean;
  isInvalid?: boolean;
  isHovered?: boolean;
  rest?: any;
  tokens: ThemeTokens;
}

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  isDisabled?: boolean;
  tokens: ThemeTokens;
}
export const Label = ({ isDisabled, ...rest }: LabelProps) => (
  <label
    css={css`
      align-items: flex-start;
      display: flex;
      color: ${isDisabled ? disabledColor(rest) : colors.text(rest)};
      ${isDisabled
        ? css`
            cursor: not-allowed;
          `
        : ''};
    `}
    {...rest}
  />
);

const disabledBorder = (iconTokens: ThemeIconTokens) => ({
  stroke: iconTokens.borderColor.disabled,
  strokeWidth: iconTokens.borderWidth,
});

const activeBorder = (iconTokens: ThemeIconTokens) => ({
  stroke: iconTokens.borderColor.active,
  strokeWidth: '2px',
});

const checkedBorder = (iconTokens: ThemeIconTokens) => ({
  stroke: iconTokens.borderColor.checked,
  strokeWidth: '2px',
});

const focusBorder = (iconTokens: ThemeIconTokens) => ({
  stroke: iconTokens.borderColor.focused,
  strokeWidth: '2px;',
});

const invalidBorder = (iconTokens: ThemeIconTokens) => ({
  stroke: iconTokens.borderColor.invalid,
  strokeWidth: '2px;',
});

<<<<<<< HEAD
const border = ({ isHovered, tokens: { icon }, ...rest }: Props) => css`
  stroke: ${isHovered ? icon.borderColor.hovered : icon.borderColor.rest};
  stroke-width: 2px;
`;
=======
const border = ({ isHovered, tokens: { icon } }: Props) => ({
  stroke: isHovered ? icon.borderColor.hovered : icon.borderColor.rest,
  strokeWidth: icon.borderWidth,
});
>>>>>>> 56f01cf1a3... fix checkbox type definitions

const getBorderColor = ({ tokens, ...props }: Props) => {
  if (props.isDisabled) {
    return disabledBorder(tokens.icon);
  }
  if (props.isActive) {
    return activeBorder(tokens.icon);
  }
  if (props.isChecked) {
    return checkedBorder(tokens.icon);
  }
  if (props.isFocused) {
    return focusBorder(tokens.icon);
  }
  if (props.isInvalid) {
    return invalidBorder(tokens.icon);
  }
  return border({ tokens, ...props });
};

const getTickColor = (props: Props) => {
  const {
    isChecked,
    isDisabled,
    isActive,
    tokens: { icon },
  } = props;

  let color = icon.tickColor.checked;

  if (isDisabled && isChecked) {
    color = icon.tickColor.disabledAndChecked;
  } else if (isActive && isChecked && !isDisabled) {
    color = icon.tickColor.activeAndChecked;
  } else if (!isChecked) {
    color = icon.tickColor.rest;
  }
  return color;
};

const getBoxColor = (props: Props) => {
  const {
    isChecked,
    isDisabled,
    isActive,
    isHovered,
    tokens: { icon },
  } = props;
  // set the default
  let color = icon.boxColor.rest;

  if (isDisabled) {
    color = icon.boxColor.disabled;
  } else if (isActive) {
    color = icon.boxColor.active;
  } else if (isHovered && isChecked) {
    color = icon.boxColor.hoveredAndChecked;
  } else if (isHovered) {
    color = icon.boxColor.hovered;
  } else if (isChecked) {
    color = icon.boxColor.checked;
  }
  return color;
};

<<<<<<< HEAD
export const LabelText = (props: { children: React.ReactNode }) => (
=======
export const LabelText = ({
  tokens,
  ...rest
}: {
  tokens: ThemeTokens;
  children: React.ReactNode;
}) => (
>>>>>>> 56f01cf1a3... fix checkbox type definitions
  <span
    css={css`
      padding: 6px 4px;
    `}
    {...props}
  />
);

export const CheckboxWrapper = (props: { children: React.ReactNode }) => (
  <span
    css={{
      display: 'flex;',
      flexShrink: 0,
      position: 'relative',
    }}
    {...props}
  />
);

interface IconProps extends React.HTMLProps<HTMLLabelElement> {
  tokens: ThemeTokens;
  isChecked?: boolean;
  isDisabled?: boolean;
  isActive?: boolean;
  isHovered?: boolean;
  isFocused?: boolean;
  isInvalid?: boolean;
}
export const IconWrapper = ({ children, ...props }: IconProps) => (
  <span
    css={{
      lineHeight: 0,
      flexShrink: 0,
      color: getBoxColor(props),
      fill: getTickColor(props),
      transition: 'all 0.2s ease-in-out;',

      /* This is adding a property to the inner svg, to add a border to the checkbox */
      '& rect:first-of-type': {
        transition: 'stroke 0.2s ease-in-out;',
        ...getBorderColor(props),
      },

      /**
       * Need to set the Icon component wrapper to flex to avoid a scrollbar bug which
       * happens when checkboxes are flex items in a parent with overflow.
       * See AK-6321 for more details.
       **/
      '> span': {
        display: 'flex',
      },
    }}
    children={children}
  />
);

interface RequiredIndicatorProps extends React.HTMLProps<HTMLSpanElement> {}

export const RequiredIndicator = (props: RequiredIndicatorProps) => (
  <span
    css={{
      color: colors.R400,
      paddingLeft: `${math.multiply(gridSize, 0.25)}px;`,
    }}
    {...props}
  />
);
