import { EmojiProvider } from '@atlaskit/emoji/types';
import { MentionProvider } from '@atlaskit/mention/types';

import { ExtensionProvider } from '../extensions/types';

import { MediaProvider } from './media-provider';

export type ProviderHandler = (name: string, provider?: Promise<any>) => void;

// TODO [ED-8005]: add other known providers like autoFormatting, task and decision etc
export interface Providers {
  mediaProvider?: Promise<MediaProvider>;
  emojiProvider?: Promise<EmojiProvider>;
  mentionProvider?: Promise<MentionProvider>;
  extensionProvider?: Promise<ExtensionProvider>;
  [key: string]: Promise<any> | undefined;
}
