import { EmojiProvider } from '../src/resource';
import { OnEmojiEvent, RelativePosition } from '../src/types';

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
