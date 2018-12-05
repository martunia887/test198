import * as React from 'react';
import { Component, MouseEvent } from 'react';
import Button from '@atlaskit/button';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import { CloseButtonWrapper } from './styled';

export interface CloseButtonProps {
  onClick: () => void;
}

export class CloseButton extends Component<CloseButtonProps, {}> {
  onClick = (e: MouseEvent) => {
    e.stopPropagation();
    this.props.onClick();
  };

  render() {
    return (
      <CloseButtonWrapper>
        <Button onClick={this.onClick} spacing="none" shouldFitContainer>
          <CrossIcon size="small" label={'Remove image' /* i18n */} />
        </Button>
      </CloseButtonWrapper>
    );
  }
}
