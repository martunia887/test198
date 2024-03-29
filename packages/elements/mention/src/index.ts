import MentionResource, {
  AbstractMentionResource,
  MentionContextIdentifier,
  MentionProvider,
  MentionStats,
  MentionResourceConfig,
} from './api/MentionResource';
import TeamMentionResource from './api/TeamMentionResource';
import PresenceResource, {
  PresenceProvider,
  AbstractPresenceResource,
} from './api/PresenceResource';
import MentionItem from './components/MentionItem';
import MentionList from './components/MentionList';
import ResourcedMentionList from './components/ResourcedMentionList';
import { MentionPickerWithAnalytics as MentionPicker } from './components/MentionPicker';
import Mention from './components/Mention';
import ResourcedMention from './components/Mention/ResourcedMention';
import {
  MentionDescription,
  MentionsResult,
  isSpecialMention,
  TeamMember,
} from './types';
import { ELEMENTS_CHANNEL } from './_constants';
import ContextMentionResource from './api/ContextMentionResource';

export {
  // Classes
  ContextMentionResource,
  MentionResource,
  TeamMentionResource,
  PresenceResource,
  AbstractMentionResource,
  AbstractPresenceResource,
  // Interfaces
  MentionProvider,
  PresenceProvider,
  MentionDescription,
  MentionsResult,
  // types
  MentionContextIdentifier,
  MentionStats,
  TeamMember,
  MentionResourceConfig,
  // Components
  MentionItem,
  MentionList,
  ResourcedMentionList,
  MentionPicker,
  Mention,
  ResourcedMention,
  // Functions
  isSpecialMention,
  // Constants
  ELEMENTS_CHANNEL,
};

export default MentionPicker;
