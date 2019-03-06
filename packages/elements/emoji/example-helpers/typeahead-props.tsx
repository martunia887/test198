import { OnEmojiEvent, RelativePosition } from '../types';
import { EmojiProvider } from '../api/EmojiResource';

export interface TypeaheadProps {
  label: string;
  onSelection: OnEmojiEvent;
  emojiProvider: Promise<EmojiProvider>;
  position?: RelativePosition;
}

export interface TypeaheadState {
  active: boolean;
  query?: string;
}
