export { AbstractResource } from '@atlaskit/util-service-support';
export { default as ResourcedEmoji } from './components/common/ResourcedEmoji';
export { default as EmojiUploader } from './components/uploader/EmojiUploader';
export {
  default as EmojiResource,
  EmojiProvider,
  UploadingEmojiProvider,
  EmojiResourceConfig,
} from './api/EmojiResource';
export { default as EmojiRepository } from './api/EmojiRepository';
export { default as EmojiLoader } from './api/EmojiLoader';
export { UsageFrequencyTracker } from './api/internal/UsageFrequencyTracker';
