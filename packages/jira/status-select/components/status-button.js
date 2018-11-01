// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import Button from '@atlaskit/button';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import Spinner from '@atlaskit/spinner';
import { colors as akColors, gridSize as akGridSize } from '@atlaskit/theme';
import noop from 'lodash/noop';

const maxWidth = akGridSize() * 25;

const LabelWrapper = styled.span`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: ${maxWidth}px;
  line-height: normal;
  vertical-align: text-bottom;
`;

const SpinnerSpan = styled.span`
  min-width: ${akGridSize() * 3}px;
  min-height: ${akGridSize() * 3}px;
  padding-top: ${akGridSize() / 2}px;
`;

const undefinedColors = {
  background: akColors.N20A,
  backgroundHover: akColors.N30A,
  color: akColors.N400,
};

const todoColors = {
  background: akColors.N40,
  backgroundHover: akColors.N50,
  color: akColors.N800,
};

const inProgressColors = {
  background: akColors.B400,
  backgroundHover: akColors.B500,
  color: akColors.N0,
};

const doneColors = {
  background: akColors.G400,
  backgroundHover: akColors.G500,
  color: akColors.N0,
};

/**
 * The below styles override the default button styles for:
 *  1. the enabled state without hover, etc. (resting)
 *  2. hover
 *  3. disabled
 *
 * The default button styles which remain as is are:
 *  1. when selecting the button (click and hold)
 *  2. when the button is selected (dropdown menu open)
 */
const colorMixin = colors => `
    &:not(:active), &:disabled {
        background: ${colors.background} !important;
        color: ${colors.color} !important;
    }
    
    &:hover:not(:active) {
        background: ${colors.backgroundHover} !important;
        color: ${colors.color} !important;
    }
`;

const createStyledButton = colors => styled(Button)`
  font-weight: 600;

  ${props => !props.isSelected && colorMixin(colors)};
`;

const TodoButton = createStyledButton(todoColors);
const InProgressButton = createStyledButton(inProgressColors);
const DoneButton = createStyledButton(doneColors);
const UndefinedButton = createStyledButton(undefinedColors);

const getStyledButton = (statusCategories, category) => {
  const { TODO, IN_PROGRESS, DONE } = statusCategories;
  const categoryToButtonMap = {
    [TODO]: { button: TodoButton, invertSpinnerColor: false },
    [DONE]: { button: DoneButton, invertSpinnerColor: true },
    [IN_PROGRESS]: { button: InProgressButton, invertSpinnerColor: true },
  };

  return (
    categoryToButtonMap[category] || {
      button: UndefinedButton,
      invertSpinnerColor: false,
    }
  );
};

const Icon = <ExpandIcon label="" size="medium" />;

class StatusButton extends PureComponent {
  static propTypes = {
    isDisabled: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isAnimated: PropTypes.bool.isRequired,
    category: PropTypes.string.isRequired,
    statusCategories: PropTypes.object,
    children: PropTypes.node.isRequired,
    showSpinner: PropTypes.bool,
    onDropDownClick: PropTypes.func,
  };

  static defaultProps = {
    showSpinner: false,
    onDropDownClick: noop,
  };

  render() {
    const { isDisabled, showSpinner, onDropDownClick } = this.props;
    const { button: StyledButton, invertSpinnerColor } = getStyledButton(
      this.props.statusCategories,
      this.props.category,
    );

    const maybeSpinner = showSpinner ? (
      <SpinnerSpan>
        <Spinner
          size="small"
          isCompleting={!showSpinner}
          invertColor={invertSpinnerColor}
        />
      </SpinnerSpan>
    ) : null;

    const buttonProps = {
      isDisabled,
      iconAfter: isDisabled ? maybeSpinner : Icon,
      isSelected: !isDisabled && this.props.isSelected,
    };
    const button = (
      <StyledButton
        {...buttonProps}
        onClick={isDisabled || showSpinner ? noop : onDropDownClick}
      >
        <LabelWrapper>{this.props.children}</LabelWrapper>
      </StyledButton>
    );

    if (this.props.isAnimated) {
      return <PulseOn>{button}</PulseOn>;
    }
    return <div>{button}</div>;
  }
}

const PulseAnimation = keyframes`
    to {
        /*
            We only need the alpha component for this color.
            The pulse color is displayed as the box-shadow
            color in 'PulseOn'
        */
        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
`;

export const PulseOn = styled.div`
  border-radius: 3px;
  box-shadow: 0 0 0 0 ${akColors.G400};
  animation: ${PulseAnimation} 1.45s cubic-bezier(0.66, 0, 0, 1);
`;

export { StatusButton };
