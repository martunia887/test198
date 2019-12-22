import { ReactNode } from 'react';
import { FileItem } from '@atlaskit/media-client';

export interface CardAction {
  label?: string;
  handler: CardEventHandler;
  icon?: ReactNode;
}

export type CardEventHandler = (item?: FileItem, event?: Event) => void;
