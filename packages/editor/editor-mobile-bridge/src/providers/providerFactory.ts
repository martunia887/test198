import { createEmojiProvider } from './emojiProvider';
import { createMentionProvider } from './mentionProvider';
import { createMediaProvider } from './mediaProvider';
import { createTaskAndDecisionProvider } from './taskDecisionProvider';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';

export const createProviderFactory = () =>
  ProviderFactory.create({
    mentionProvider: createMentionProvider(),
    emojiProvider: createEmojiProvider(),
    mediaProvider: createMediaProvider(),
    taskAndDecisionProvider: Promise.resolve(createTaskAndDecisionProvider()),
  });
