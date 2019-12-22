import { ELEMENTS_CHANNEL } from './_constants';
import ContextMentionResource from './api/ContextMentionResource';
import { MentionNameClient } from './api/MentionNameClient';
import {
  DefaultMentionNameResolver,
  MentionNameResolver,
} from './api/MentionNameResolver';
import MentionResource, {
  AbstractMentionResource,
  MentionContextIdentifier,
  MentionProvider,
  ResolvingMentionProvider,
  MentionStats,
  MentionResourceConfig,
  TeamMentionResourceConfig,
  isResolvingMentionProvider,
} from './api/MentionResource';
import PresenceResource, {
  PresenceProvider,
  AbstractPresenceResource,
} from './api/PresenceResource';
import TeamMentionResource from './api/TeamMentionResource';
import Mention from './components/Mention';
import ResourcedMention from './components/Mention/ResourcedMention';
import MentionItem from './components/MentionItem';
import MentionList from './components/MentionList';
import { MentionPickerWithAnalytics as MentionPicker } from './components/MentionPicker';
import ResourcedMentionList from './components/ResourcedMentionList';
import TeamMentionHighlight from './components/TeamMentionHighlight';
import TeamMentionHighlightController from './components/TeamMentionHighlight/TeamMentionHighlightController';
import {
  MentionDescription,
  MentionsResult,
  MentionNameStatus,
  MentionNameDetails,
  isSpecialMention,
  TeamMember,
} from './types';

export {
  // Classes
  ContextMentionResource,
  MentionResource,
  TeamMentionResource,
  PresenceResource,
  DefaultMentionNameResolver,
  AbstractMentionResource,
  AbstractPresenceResource,
  // Interfaces
  ResolvingMentionProvider,
  MentionProvider,
  PresenceProvider,
  MentionDescription,
  MentionsResult,
  MentionNameResolver,
  MentionNameClient,
  MentionNameStatus,
  MentionNameDetails,
  // types
  MentionContextIdentifier,
  MentionStats,
  TeamMember,
  MentionResourceConfig,
  TeamMentionResourceConfig,
  // Components
  MentionItem,
  MentionList,
  ResourcedMentionList,
  MentionPicker,
  Mention,
  ResourcedMention,
  TeamMentionHighlight,
  TeamMentionHighlightController,
  // Functions
  isSpecialMention,
  isResolvingMentionProvider,
  // Constants
  ELEMENTS_CHANNEL,
};

export default MentionPicker;
