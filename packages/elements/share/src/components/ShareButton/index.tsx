import React, { Component } from 'react';
import AkButton from '@atlaskit/button';
import ShareIcon from '@atlaskit/icon/glyph/share';

export interface OnClick {
  (): void;
}

export interface Props {
  onClick: OnClick;
}

export default class ShareButtonComponent extends Component<Props, {}> {
  render() {
    return (
      <AkButton
        appearance="primary"
        iconBefore={<ShareIcon label={''} />}
        onClick={this.props.onClick}
      >
        Share
      </AkButton>
    );
  }
}
