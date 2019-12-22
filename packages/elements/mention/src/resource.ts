import { ELEMENTS_CHANNEL } from './_constants';
import ContextMentionResource from './api/ContextMentionResource';
import { MentionNameClient } from './api/MentionNameClient';
import {
  DefaultMentionNameResolver,
  MentionNameResolver,
} from './api/MentionNameResolver';
import MentionResource, {
  AbstractMentionResource,
  ResolvingMentionProvider,
  MentionContextIdentifier,
  MentionProvider,
  MentionStats,
  MentionResourceConfig,
  isResolvingMentionProvider,
  TeamMentionProvider,
} from './api/MentionResource';
import PresenceResource, {
  PresenceProvider,
  AbstractPresenceResource,
} from './api/PresenceResource';
import {
  MentionDescription,
  MentionsResult,
  isSpecialMention,
  MentionNameStatus,
  MentionNameDetails,
} from './types';

export {
  // Classes
  ContextMentionResource,
  MentionResource,
  PresenceResource,
  AbstractMentionResource,
  AbstractPresenceResource,
  DefaultMentionNameResolver,
  // Interfaces
  ResolvingMentionProvider,
  MentionProvider,
  PresenceProvider,
  MentionDescription,
  MentionsResult,
  MentionNameClient,
  MentionNameResolver,
  TeamMentionProvider,
  // types
  MentionContextIdentifier,
  MentionStats,
  MentionResourceConfig,
  MentionNameStatus,
  MentionNameDetails,
  // Functions
  isSpecialMention,
  isResolvingMentionProvider,
  // Constants
  ELEMENTS_CHANNEL,
};
