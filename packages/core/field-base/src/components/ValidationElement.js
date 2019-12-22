// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from '@atlaskit/icon/glyph/warning';
import Spinner from '@atlaskit/spinner';
import { yellow } from '@atlaskit/theme/colors';

// exported for testing
export const WarningIcon = styled.div`
  align-items: center;
  color: ${yellow};
  display: flex;
  flex-shrink: 0;
`;

// Spinner needs set height to avoid height jumping
// Also needs a margin so there is space between it and preceding text
const SpinnerParent = styled.div`
  height: 20px;
  margin-left: 10px;
`;

type Props = {|
  isDisabled: boolean,
  isInvalid: boolean,
  isLoading: boolean,
|};
export default class ValidationElement extends Component<Props, void> {
  static defaultProps = {
    isDisabled: false,
    isInvalid: false,
    isLoading: false,
  };

  render() {
    if (!this.props.isDisabled && this.props.isInvalid) {
      return (
        <WarningIcon>
          <Icon label="warning" />
        </WarningIcon>
      );
    }

    return this.props.isLoading ? (
      <SpinnerParent>
        <Spinner size="small" />
      </SpinnerParent>
    ) : null;
  }
}
