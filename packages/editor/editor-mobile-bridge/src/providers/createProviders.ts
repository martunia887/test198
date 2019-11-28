import {
  EditorCardProvider,
  Client as EditorCardClient,
} from '@atlaskit/smart-card';
import { EmojiProvider } from '@atlaskit/emoji/resource';
import { MediaProvider, MentionProvider } from '@atlaskit/editor-core';
import { TaskDecisionProvider } from '@atlaskit/task-decision';
import { createCardClient, createCardProvider } from './cardProvider';
import { createEmojiProvider } from './emojiProvider';
import { createMediaProvider } from './mediaProvider';
import { createMentionProvider } from './mentionProvider';
import { createMockEmojiProvider } from './mockEmojiProvider';
import { createTaskDecisionProvider } from './taskDecisionProvider';

export interface Providers {
  cardClient: EditorCardClient;
  cardProvider: EditorCardProvider;
  emojiProvider: EmojiProvider;
  mediaProvider: MediaProvider;
  mentionProvider: MentionProvider;
  mockEmojiProvider: EmojiProvider;
  taskDecisionProvider: TaskDecisionProvider;
}

export async function createProviders(): Promise<Providers> {
  const cardClient = createCardClient();
  const mockEmojiProvider = createMockEmojiProvider();
  const taskDecisionProvider = createTaskDecisionProvider();

  const tasks = [
    toResult(createCardProvider()),
    toResult(createEmojiProvider()),
    toResult(createMediaProvider()),
    toResult(createMentionProvider()),
  ] as const;

  const results = await Promise.all(tasks);
  const [cardProvider, emojiProvider, mediaProvider, mentionProvider] = results;

  return {
    cardClient,
    // Improve error handling without breaking
    // current behaviour - instead of failing silently
    // we now log an error and carry on
    cardProvider: toOption(cardProvider)!,
    emojiProvider: toOption(emojiProvider)!,
    mediaProvider: toOption(mediaProvider)!,
    mentionProvider: toOption(mentionProvider)!,
    mockEmojiProvider,
    taskDecisionProvider,
  };
}

function toOption<T>(result: T | Error): T | undefined {
  if (result instanceof Error) {
    // eslint-disable-next-line no-console
    console.error(result);
    return;
  }
  return result;
}

async function toResult<T>(task: Promise<T>): Promise<T | Error> {
  try {
    return await task;
  } catch (err) {
    return err;
  }
}
