import * as React from 'react';
import { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import * as styles from './styles';

import { EmojiUpload } from '../../types';
import { EmojiProvider, supportsUploadFeature } from '../../api/EmojiResource';
import { FireAnalyticsEvent } from '@atlaskit/analytics';
import EmojiUploadPicker from '../common/EmojiUploadPicker';
import { uploadEmoji } from '../common/UploadEmoji';

export interface UploadRefHandler {
  (ref: HTMLDivElement): void;
}

export interface Props {
  emojiProvider: EmojiProvider;
  onUploaderRef?: UploadRefHandler;
  firePrivateAnalyticsEvent?: FireAnalyticsEvent;
}

export interface State {
  uploadErrorMessage?: FormattedMessage.MessageDescriptor;
}

export default class EmojiUploadComponent extends PureComponent<Props, State> {
  private ref?: EmojiUploadPicker | null;

  constructor(props: Props) {
    super(props);
    if (supportsUploadFeature(props.emojiProvider)) {
      props.emojiProvider.prepareForUpload();
    }

    this.state = {};
  }

  private onUploadEmoji = (upload: EmojiUpload) => {
    const { emojiProvider } = this.props;
    const errorSetter = (message?: FormattedMessage.MessageDescriptor) =>
      this.setState({
        uploadErrorMessage: message,
      });
    uploadEmoji(
      upload,
      emojiProvider,
      errorSetter,
      this.prepareForUpload,
      () => null,
    );
  };

  private prepareForUpload = () => {
    const { emojiProvider } = this.props;
    if (supportsUploadFeature(emojiProvider)) {
      emojiProvider.prepareForUpload();
    }

    this.setState({
      uploadErrorMessage: undefined,
    });

    if (this.ref) {
      this.ref.clearUploadPicker();
    }
  };

  private onUploaderRef = (emojiUploadPicker: EmojiUploadPicker | null) => {
    this.ref = emojiUploadPicker;
  };

  render() {
    const { uploadErrorMessage } = this.state;

    const errorMessage = uploadErrorMessage ? (
      <FormattedMessage {...uploadErrorMessage} />
    ) : null;

    return (
      <div
        className={classNames([styles.emojiUploadWidget])}
        ref={this.props.onUploaderRef}
      >
        <div className={classNames([styles.emojiUploadFooter])}>
          <EmojiUploadPicker
            ref={this.onUploaderRef}
            onUploadCancelled={this.prepareForUpload}
            onUploadEmoji={this.onUploadEmoji}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    );
  }
}
