'use strict';
import * as React from 'react';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import LocalBrowserButton from './uploadButton';
import { filesIcon } from '../../../../icons';
import {
  ButtonWrapper,
  DefaultImage,
  DropzoneText,
  DropzoneContainer,
  DropzoneContentWrapper,
  TextWrapper,
} from './styled';
import { Browser } from '../../../../components/browser/browser';

export interface DropzoneProps {
  readonly browserRef: React.RefObject<Browser>;
}

export class Dropzone extends Component<DropzoneProps> {
  render() {
    const { browserRef } = this.props;
    return (
      <DropzoneContainer>
        <DropzoneContentWrapper>
          <DefaultImage src={filesIcon} />
          <TextWrapper>
            <DropzoneText>
              <FormattedMessage {...messages.drag_and_drop_your_files} />
            </DropzoneText>
            <ButtonWrapper>
              <LocalBrowserButton
                browserRef={browserRef}
                appearance="default"
              />
            </ButtonWrapper>
          </TextWrapper>
        </DropzoneContentWrapper>
      </DropzoneContainer>
    );
  }
}
