import React, { Component } from 'react';
import FieldTextArea from '@atlaskit/field-text-area';
import { ShareMessageContainerStyle } from './styles';

interface OnMessageChange {
  (e: any): void;
}

interface Props {
  handleMessageChange: OnMessageChange;
}

export default class ShareMessageComponent extends Component<Props, {}> {
  render() {
    return (
      <ShareMessageContainerStyle>
        <FieldTextArea
          autoFocus
          isLabelHidden
          onChange={this.props.handleMessageChange}
          shouldFitContainer
          placeholder="Include an optional message"
        />
      </ShareMessageContainerStyle>
    );
  }
}
