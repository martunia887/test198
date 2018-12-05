import * as React from 'react';
import { Component } from 'react';
import Button from '@atlaskit/button';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';

export interface BackButtonProps {
  onClick: () => void;
}

export class BackButton extends Component<BackButtonProps, {}> {
  render() {
    return (
      <Button
        className="round-button"
        iconAfter={<ArrowLeftIcon label="" />}
        onClick={this.props.onClick}
      />
    );
  }
}
