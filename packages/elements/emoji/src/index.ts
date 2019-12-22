import { AbstractResource } from '@atlaskit/util-service-support';

import EmojiLoader from './api/EmojiLoader';
import EmojiRepository from './api/EmojiRepository';
import EmojiResource, {
  EmojiProvider,
  UploadingEmojiProvider,
  EmojiResourceConfig,
} from './api/EmojiResource';
import { denormaliseEmojiServiceResponse } from './api/EmojiUtils';
import { UsageFrequencyTracker } from './api/internal/UsageFrequencyTracker';
import Emoji from './components/common/Emoji';
import EmojiPlaceholder from './components/common/EmojiPlaceholder';
import ResourcedEmoji from './components/common/ResourcedEmoji';
import EmojiPicker from './components/picker/EmojiPicker';
import EmojiTypeAhead from './components/typeahead/EmojiTypeAhead';
import EmojiTypeAheadItem from './components/typeahead/EmojiTypeAheadItem';
import EmojiUploader from './components/uploader/EmojiUploader';
import {
  customCategory,
  defaultEmojiHeight,
  emojiPickerWidth,
  emojiPickerHeight,
} from './util/constants';
import { toEmojiId, toOptionalEmojiId } from './util/type-helpers';

export {
  // Classes
  AbstractResource,
  Emoji,
  EmojiPlaceholder,
  EmojiLoader,
  EmojiPicker,
  EmojiUploader,
  EmojiResource,
  EmojiRepository,
  EmojiTypeAhead,
  ResourcedEmoji,
  // functions
  denormaliseEmojiServiceResponse,
  toEmojiId,
  toOptionalEmojiId,
  // interfaces
  EmojiProvider,
  UploadingEmojiProvider,
  // Constants
  emojiPickerWidth,
  emojiPickerHeight,
  defaultEmojiHeight,
  customCategory,
  EmojiResourceConfig,
  UsageFrequencyTracker,
  EmojiTypeAheadItem,
};

export * from './types';

export default EmojiPicker;
