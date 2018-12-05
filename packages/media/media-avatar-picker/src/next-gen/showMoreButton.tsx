import * as React from 'react';
import { Component } from 'react';
import Button from '@atlaskit/button';
import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more';

export interface ShowMoreButtonProps {
  onClick?: () => void;
}

export class ShowMoreButton extends Component<ShowMoreButtonProps, {}> {
  render() {
    return (
      <Button
        className="round-button"
        iconAfter={<EditorMoreIcon label="" size="large" />}
        onClick={this.props.onClick}
      />
    );
  }
}
