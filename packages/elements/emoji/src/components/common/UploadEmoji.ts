import { FormattedMessage } from 'react-intl';

import { EmojiProvider, supportsUploadFeature } from '../../api/EmojiResource';

import { EmojiDescription, EmojiUpload } from '../../types';

import { messages } from '../i18n';

export const uploadEmoji = (
  upload: EmojiUpload,
  emojiProvider: EmojiProvider,
  errorSetter: (
    message: FormattedMessage.MessageDescriptor | undefined,
  ) => void,
  onSuccess: (emojiDescription: EmojiDescription) => void,
  onFailure: (message: FormattedMessage.MessageDescriptor) => void,
) => {
  errorSetter(undefined);
  if (supportsUploadFeature(emojiProvider)) {
    emojiProvider
      .uploadCustomEmoji(upload)
      .then(emojiDescription => onSuccess(emojiDescription))
      .catch(err => {
        errorSetter(messages.emojiUploadFailed);
        // tslint:disable-next-line no-console
        console.error('Unable to upload emoji', err);
        onFailure(messages.emojiUploadFailed);
      });
  }
};
