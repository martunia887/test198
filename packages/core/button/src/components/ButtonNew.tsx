import * as React from 'react';
import styled from 'styled-components';
import GlobalTheme, { ThemeProp } from '@atlaskit/theme';
import { Theme, ThemeAppearance, ThemeTokens, ThemeProps } from '../themeNew';
import getButtonStyles from '../styled/getButtonStylesNew';
import { ButtonProps } from '../types';
import ButtonWrapper from '../styled/ButtonWrapper';
import ButtonContent from '../styled/ButtonContent';
import LoadingSpinner from '../styled/LoadingSpinner';
import IconWrapper from '../styled/IconWrapper';

export type ButtonState = {
  isHover: boolean;
  isActive: boolean;
  isFocus: boolean;
};

const StyledButton = styled.button`
  ${getButtonStyles};
`;
StyledButton.displayName = 'StyledButton';

const mapAttributesToState = ({
  isDisabled,
  isActive,
  isFocus,
  isHover,
  isSelected,
}) => {
  if (isDisabled) return 'disabled';
  if (isSelected && isFocus) return 'focusSelected';
  if (isSelected) return 'selected';
  if (isActive) return 'active';
  if (isHover) return 'hover';
  if (isFocus) return 'focus';
  return 'default';
};

export default class Button extends React.Component<ButtonProps, ButtonState> {
  state = {
    isActive: false,
    isFocus: false,
    isHover: false,
  };

  onMouseEnter = () => {
    this.setState({ isHover: true });
  };

  onMouseLeave = () => {
    this.setState({ isHover: false, isActive: false });
  };

  onMouseDown = (e: Event) => {
    e.preventDefault();
    this.setState({ isActive: true });
  };

  onMouseUp = () => this.setState({ isActive: false });

  onFocus: React.FocusEventHandler<HTMLButtonElement> = event => {
    this.setState({ isFocus: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  onBlur: React.FocusEventHandler<HTMLButtonElement> = event => {
    this.setState({ isFocus: false });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  isInteractive = () => !this.props.isDisabled && !this.props.isLoading;

  // Swallow click events when the button is disabled
  // to prevent inner child clicks bubbling up.
  onInnerClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    if (!this.isInteractive()) e.stopPropagation();
    return true;
  };

  render() {
    const { state } = this;
    const {
      appearance,
      children,
      iconAfter,
      iconBefore,
      isDisabled,
      isLoading,
      isSelected,
      shouldFitContainer,
      spacing,
      theme,
    } = this.props;
    const attributes = { ...state, isSelected, isDisabled };

    const iconIsOnlyChild: boolean = !!(
      (iconBefore && !iconAfter && !children) ||
      (iconAfter && !iconBefore && !children)
    );

    return (
      <Theme.Provider value={theme}>
        <GlobalTheme.Consumer>
          {({ mode }) => (
            <Theme.Consumer
              appearance={appearance}
              mode={mode}
              state={mapAttributesToState(attributes)}
            >
              {tokens => (
                <StyledButton
                  onMouseEnter={this.onMouseEnter}
                  onMouseLeave={this.onMouseLeave}
                  onMouseDown={this.onMouseDown}
                  onMouseUp={this.onMouseUp}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  isActive={state.isActive}
                  isFocus={state.isFocus}
                  isDisabled={isDisabled}
                  {...tokens}
                >
                  <ButtonWrapper
                    onClick={this.onInnerClick}
                    fit={!!shouldFitContainer}
                  >
                    {isLoading && (
                      <LoadingSpinner
                        spacing={spacing}
                        appearance={appearance}
                        isSelected={isSelected}
                        isDisabled={isDisabled}
                      />
                    )}
                    {iconBefore && (
                      <IconWrapper
                        isLoading={isLoading}
                        spacing={spacing}
                        isOnlyChild={iconIsOnlyChild}
                      >
                        {iconBefore}
                      </IconWrapper>
                    )}
                    <ButtonContent
                      isLoading={isLoading}
                      followsIcon={!!iconBefore}
                      spacing={spacing}
                    >
                      {children}
                    </ButtonContent>
                    {iconAfter && (
                      <IconWrapper
                        isLoading={isLoading}
                        spacing={spacing}
                        isOnlyChild={iconIsOnlyChild}
                      >
                        {iconAfter}
                      </IconWrapper>
                    )}
                  </ButtonWrapper>
                </StyledButton>
              )}
            </Theme.Consumer>
          )}
        </GlobalTheme.Consumer>
      </Theme.Provider>
    );
  }
}
