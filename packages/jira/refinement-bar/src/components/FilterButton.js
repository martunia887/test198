// @flow
/** @jsx jsx */

// $FlowFixMe
import { forwardRef } from 'react';
import { jsx } from '@emotion/core';
import { borderRadius, colors, gridSize } from '@atlaskit/theme';
import CloseIcon from '@atlaskit/icon/glyph/editor/close';

export const FilterButton = forwardRef(
  (
    { children, field, isInvalid, isRemovable, onRemove, value, ...rest },
    ref,
  ) => {
    return isRemovable ? (
      <ButtonWrapper>
        <Button
          appearance={isInvalid ? 'warning' : 'default'}
          {...rest}
          ref={ref}
          hasIcon
        >
          {children}
        </Button>

        <ClearButton
          onClick={onRemove}
          style={{
            color: rest.isSelected && !isInvalid ? 'white' : colors.N800,
          }}
        >
          <CloseIcon
            primaryColor="inherit"
            label={`Remove ${field.label} filter`}
          />
        </ClearButton>
      </ButtonWrapper>
    ) : (
      <Button {...rest} ref={ref}>
        {children}
      </Button>
    );
  },
);

// styled components

const appearances = ({ appearance, isSelected }) => {
  const styles = {
    default: {
      base: {
        background: isSelected ? colors.N700 : colors.N20A,
        color: isSelected ? 'white' : colors.N400,
      },
      active: {
        background: isSelected ? colors.N700 : colors.B50,
        color: isSelected ? 'white' : colors.B400,
      },
      hover: {
        background: isSelected ? colors.N700 : colors.N30A,
        color: isSelected ? 'white' : colors.N400,
      },
    },
    warning: {
      base: {
        background: colors.Y100,
      },
      active: {
        background: colors.Y200,
      },
      hover: {
        background: colors.Y200,
      },
    },
  };

  return styles[appearance];
};

const Button = forwardRef(
  ({ appearance, hasIcon, isSelected, ...props }: *, ref) => {
    const dynamic = appearances({ appearance, isSelected });

    return (
      <button
        ref={ref}
        css={{
          alignItems: 'baseline',
          borderRadius: borderRadius(),
          borderWidth: 0,
          boxSizing: 'border-box',
          cursor: 'pointer',
          display: 'inline-flex',
          fontSize: 'inherit',
          fontStyle: 'normal',
          lineHeight: 1.3,
          margin: 0,
          maxWidth: '100%',
          outline: 0,
          padding: `${gridSize()}px ${gridSize() * 1.5}px`,
          paddingRight: hasIcon ? 36 : null,
          textAlign: 'center',
          textDecoration: 'none',
          transition:
            'background 0.1s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)',
          transitionDuration: '0.1s, 0.15s',
          verticalAlign: 'middle',
          whiteSpace: 'nowrap',
          ...dynamic.base,

          '&:hover': {
            transition:
              'background 0s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)',
            ...dynamic.hover,
          },

          '&:focus': {
            boxShadow: '0 0 0 2px rgba(38,132,255,0.6)',
            transitionDuration: '0s, 0.2s',

            '&::-moz-focus-inner': {
              border: 0,
              margin: 0,
              padding: 0,
            },
          },

          '&:active': {
            transitionDuration: 0,
            ...dynamic.active,
          },
        }}
        {...props}
      />
    );
  },
);
Button.defaultProps = {
  appearance: 'default',
};
const ButtonWrapper = props => (
  <div css={{ position: 'relative' }} {...props} />
);

const ClearButton = props => (
  <button
    css={{
      background: 0,
      border: 0,
      borderRadius: borderRadius() / 2,
      cursor: 'pointer',
      lineHeight: 1,
      opacity: 0.5,
      outline: 0,
      padding: 0,
      position: 'absolute',
      right: 8,
      top: '50%',
      transform: 'translateY(-50%)',

      ':hover, :focus': {
        backgroundColor: colors.N30A,
      },
    }}
    {...props}
  />
);
