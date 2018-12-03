import * as React from 'react';
import { css } from 'emotion';
import { colors, borderRadius } from '@atlaskit/theme';

const disabledStyles = {
  background: colors.N20A,
  color: `${colors.N70}`,
  '&:hover': {
    cursor: 'not-allowed',
  },
};

const disabledSubtleStyles = { ...disabledStyles, background: 'none' };

const selectedStyles = {
  background: colors.N700,
  color: colors.N20,
  '&:hover': {
    background: colors.N700,
    color: colors.N20,
    textDecoration: 'none',
  },
};

const buttonContentWrapperStyles = css({
  alignSelf: 'center',
  alignItems: 'center',
  display: 'inline-flex',
  flexWrap: 'nowrap',
  maxWidth: '100%',
  position: 'relative',
  '.-fit &': {
    width: '100%',
  },
});

const buttonChildrenWrapperStyles = css({
  flex: '1 1 auto',
  margin: `0 4px`,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '.-spacing-none &': {
    margin: 0,
  },
});

const iconWrapperStyles = css({
  alignSelf: 'center',
  display: 'flex',
  flexShrink: 0,
  lineHeight: 0,
  fontSize: 0,
  userSelect: 'none',
  margin: '0 4px',
  '&:only-child': {
    margin: '0 -2px',
  },
});

const baseStyles = css({
  'align-items': 'baseline',
  'border-radius': `${borderRadius()}px`,
  'border-width': 0,
  'box-sizing': 'border-box',
  cursor: 'default',
  display: 'inline-flex',
  'font-size': 'inherit',
  'font-style': 'normal',
  height: '2.28571em',
  'line-height': '2.28571em',
  margin: 0,
  'max-width': '100%',
  outline: 'none !important',
  padding: '0 8px',
  'text-align': 'center',
  'text-decoration': 'none',
  transition:
    'background 0.1s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)',
  'transition-duration': '0.1s, 0.15s',
  'vertical-align': 'middle',
  'white-space': 'nowrap',
  width: 'auto',
  '&:hover': {
    cursor: 'pointer',
    transition:
      'background 0s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)',
  },
  '&:active': {
    transitionDuration: 0,
  },
  '&:focus': {
    outline: 'none',
    transitionDuration: '0s, 0.2s',
  },
  '&::-moz-focus-inner': {
    border: 0,
    margin: 0,
    padding: 0,
  },
  '&.-fit': {
    width: '100%',
  },
  '&.-spacing-compact': {
    height: '1.7142em',
    'line-height': '1.7142em',
  },
  '&.-spacing-none': {
    padding: 0,
    height: 'auto',
    lineHeight: 'inherit',
    verticalAlign: 'baseline',
  },
});

const defaultStyles = css(
  {
    background: colors.N20A,
    color: `${colors.N400}`,
    '&:hover': {
      background: colors.N30A,
    },
    '&:active': {
      background: 'rgba(179, 212, 255, 0.6)',
      color: colors.B400,
    },
    '&:focus': {
      'box-shadow': '0 0 0 2px rgba(38, 132, 255, 0.6)',
    },
    '&[disabled]': disabledStyles,
    '&.-selected': selectedStyles,
  },
  baseStyles,
);

const primaryStyles = css(
  {
    background: colors.B400,
    color: `${colors.N0}`,
    '&:hover': {
      background: colors.B300,
    },
    '&:active': {
      background: colors.B500,
    },
    '&:focus': {
      'box-shadow': '0 0 0 2px rgba(38, 132, 255, 0.6)',
    },
    '&[disabled]': disabledStyles,
    '&.-selected': selectedStyles,
  },
  baseStyles,
);

const warningStyles = css(
  {
    background: colors.Y300,
    color: `${colors.N800}`,
    '&:hover': {
      background: colors.Y200,
    },
    '&:active': {
      background: colors.Y400,
    },
    '&:focus': {
      'box-shadow': `0 0 0 2px ${colors.Y500}`,
    },
    '&[disabled]': disabledStyles,
    '&.-selected, &.selected:hover': {
      background: colors.Y400,
      color: colors.N800,
    },
  },
  baseStyles,
);

const dangerStyles = css(
  {
    background: colors.R400,
    color: `${colors.N0}`,
    '&:hover': {
      background: colors.R300,
    },
    '&:active': {
      background: colors.R500,
    },
    '&:focus': {
      'box-shadow': `0 0 0 2px ${colors.R100}`,
    },
    '&[disabled]': disabledStyles,
    '&.-selected, &.-selected:hover': {
      background: colors.R500,
      color: colors.N0,
    },
  },
  baseStyles,
);

const helpStyles = css(
  {
    background: colors.P400,
    color: `${colors.N0}`,
    '&:hover': {
      background: colors.P200,
    },
    '&:active': {
      background: colors.P500,
    },
    '&:focus': {
      'box-shadow': `0 0 0 2px ${colors.P100}`,
    },
    '&[disabled]': disabledStyles,
    '&.-selected': selectedStyles,
  },
  baseStyles,
);

const subtleStyles = css(
  {
    background: 'none',
    color: `${colors.N400}`,
    '&:hover': {
      background: colors.N30A,
    },
    '&:active': {
      background: 'rgba(179, 212, 255, 0.6)',
      color: colors.B400,
    },
    '&:focus': {
      'box-shadow': '0 0 0 2px rgba(38, 132, 255, 0.6)',
    },
    '&[disabled]': disabledSubtleStyles,
    '&.-selected': selectedStyles,
  },
  baseStyles,
);

const linkStyles = css(
  {
    background: 'none',
    color: `${colors.B400}`,
    '&:hover': {
      color: colors.B300,
      textDecoration: 'underline',
    },
    '&:active': {
      color: colors.B500,
    },
    '&:focus': {
      'box-shadow': `0 0 0 2px ${colors.P100}`,
    },
    '&[disabled]': disabledSubtleStyles,
    '&.-selected': selectedStyles,
  },
  baseStyles,
);

const subtleLinkStyles = css(
  {
    background: 'none',
    color: `${colors.N200}`,
    '&:hover': {
      color: colors.N90,
      textDecoration: 'underline',
    },
    '&:active': {
      color: colors.N400,
    },
    '&:focus': {
      'box-shadow': `0 0 0 2px ${colors.B200}`,
    },
    '&[disabled]': disabledSubtleStyles,
    '&.-selected': selectedStyles,
  },
  baseStyles,
);

const appearanceToStyles = {
  default: defaultStyles,
  primary: primaryStyles,
  warning: warningStyles,
  danger: dangerStyles,
  help: helpStyles,
  subtle: subtleStyles,
  link: linkStyles,
  'subtle-link': subtleLinkStyles,
};

export type Props = React.Props<HTMLButtonElement> &
  React.ButtonHTMLAttributes<any> & {
    appearance?:
      | 'default'
      | 'primary'
      | 'help'
      | 'warning'
      | 'danger'
      | 'subtle'
      | 'link'
      | 'subtle-link';
    disabled?: boolean;
    iconBefore?: React.ReactChild;
    iconAfter?: React.ReactChild;
    isSelected?: boolean;
    spacing?: 'default' | 'compact';
    shouldFitContainer?: boolean;
    component?: React.ComponentType;
    isDisabled?: boolean;
  };

const preventClick = (e: React.MouseEvent) => e.stopPropagation();

export default function Button(props: Props) {
  const {
    children,
    iconBefore,
    iconAfter,
    appearance = 'default',
    disabled: disabledHtmlAttr,
    isDisabled,
    spacing,
    isSelected,
    shouldFitContainer,
    component,
    onClick,
    className,
    ...rest
  } = props;
  const modifiers: Array<string> = [];
  const disabled = disabledHtmlAttr || isDisabled;

  if (shouldFitContainer) {
    modifiers.push('-fit');
  }

  if (isSelected) {
    modifiers.push('-selected');
  }

  const Component = component || 'button';

  return (
    <Component
      {...rest}
      disabled={disabled}
      className={[
        className,
        appearanceToStyles[appearance],
        modifiers,
        `-spacing-${spacing || 'default'}`,
      ].join(' ')}
    >
      <span
        className={buttonContentWrapperStyles}
        onClick={disabled ? preventClick : onClick}
      >
        {iconBefore ? (
          <span className={iconWrapperStyles}>{iconBefore}</span>
        ) : null}
        {children ? (
          <span className={buttonChildrenWrapperStyles}>{children}</span>
        ) : null}
        {iconAfter ? (
          <span className={iconWrapperStyles}>{iconAfter}</span>
        ) : null}
      </span>
    </Component>
  );
}

const buttonGroupStyles = css({
  display: 'inline-flex',
  margin: '0px -2px',
  '& > *': {
    flex: '1 0 auto',
    margin: '0px 2px !important',
  },
});

export function ButtonGroup(props: React.Props<HTMLDivElement>) {
  return <div className={buttonGroupStyles}>{props.children}</div>;
}
