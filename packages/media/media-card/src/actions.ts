import { MediaItem } from '@atlaskit/media-client';
import { ReactNode } from 'react';

export interface CardAction {
  label?: string;
  handler: CardEventHandler;
  icon?: ReactNode;
}

export type CardEventHandler = (item?: MediaItem, event?: Event) => void;
