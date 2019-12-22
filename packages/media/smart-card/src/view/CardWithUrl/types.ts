import { EventHandler, MouseEvent, KeyboardEvent } from 'react';
import { AnalyticsHandler } from '../../utils/types';
import { CardAppearance } from '../Card/types';

export type CardWithUrlContentProps = {
  url: string;
  appearance: CardAppearance;
  onClick?: EventHandler<MouseEvent | KeyboardEvent>;
  isSelected?: boolean;
  container?: HTMLElement;
  dispatchAnalytics: AnalyticsHandler;
  onResolve?: (data: { url?: string; title?: string }) => void;
};
