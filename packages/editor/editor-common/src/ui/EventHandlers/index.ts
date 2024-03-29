import { Identifier } from '@atlaskit/media-core';
import { CardEvent } from '@atlaskit/media-card';
import { SyntheticEvent } from 'react';
import { ActionMarkAction } from '@atlaskit/adf-schema';

export interface CardSurroundings {
  collectionName: string;
  list: Identifier[];
}

export type MentionEventHandler = (
  mentionId: string,
  text: string,
  event?: SyntheticEvent<HTMLSpanElement>,
) => void;
export type CardEventClickHandler = (
  result: CardEvent,
  surroundings?: CardSurroundings,
  analyticsEvent?: any,
) => void;
export type ActionEventClickHandler = (action: ActionMarkAction) => void;
export type LinkEventClickHandler = (
  event: SyntheticEvent<HTMLAnchorElement>,
  url?: string,
) => void;
export type SmartCardEventClickHandler = (url?: string) => void;

export interface MentionEventHandlers {
  onClick: MentionEventHandler;
  onMouseEnter: MentionEventHandler;
  onMouseLeave: MentionEventHandler;
}

export interface EventHandlers {
  mention?: MentionEventHandlers;
  media?: {
    onClick?: CardEventClickHandler;
  };
  link?: {
    onClick?: LinkEventClickHandler;
  };
  smartCard?: {
    onClick?: SmartCardEventClickHandler;
  };
  action?: {
    onClick?: ActionEventClickHandler;
  };
}
