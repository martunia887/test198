/* eslint @atlassian/confluence-es6/matching-tests:0 */
import React, { createRef, Component } from 'react';
import AkButton from '@atlaskit/button';
import TextField from '@atlaskit/field-text';
import { document } from 'window-or-global';
import {
  ShareableLinkContainerStyle,
  ShareableLinkWrapperStyle,
  ShareableLinkInputFieldWrapperStyle,
} from './styles';

export interface Props {
  link: string;
}

export default class ShareableLinkComponent extends Component<Props, {}> {
  private fieldTextRef: any = createRef();
  private justCopiedTimeoutId: any;

  state = {
    justCopied: false,
  };

  componentWillUnmount() {
    clearTimeout(this.justCopiedTimeoutId);
  }

  showShareableLink = evt => {
    evt.preventDefault();
    this.setState({ shouldShowShareableLink: true });
  };

  copyShareableLink = evt => {
    this.selectShareableLinkText();
    document.execCommand('copy');
    evt.target.focus();
    this.setState({ justCopied: true });
    clearTimeout(this.justCopiedTimeoutId);
    this.justCopiedTimeoutId = setTimeout(() => {
      this.setState({ justCopied: false });
    }, 3000);
  };

  selectShareableLinkText = () => {
    if (this.fieldTextRef.current) {
      this.fieldTextRef.current.input.select();
    }
  };

  render() {
    const { link } = this.props;
    return (
      <ShareableLinkContainerStyle>
        <ShareableLinkWrapperStyle>
          <ShareableLinkInputFieldWrapperStyle>
            <TextField
              ref={this.fieldTextRef}
              isReadOnly
              shouldFitContainer
              label="Share this link"
              value={link}
              onFocus={this.selectShareableLinkText}
            />
          </ShareableLinkInputFieldWrapperStyle>
          <AkButton onClick={this.copyShareableLink}>
            {this.state.justCopied ? 'Copied!' : 'Copy'}
          </AkButton>
        </ShareableLinkWrapperStyle>
      </ShareableLinkContainerStyle>
    );
  }
}
