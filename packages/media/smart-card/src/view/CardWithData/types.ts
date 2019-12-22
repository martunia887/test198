import { EventHandler, MouseEvent, KeyboardEvent } from 'react';
import { CardState } from '../../state/types';
import { CardAppearance } from '../Card/types';

export interface CardWithDataContentProps {
  appearance: CardAppearance;
  data: CardState['details'];
  onClick?: EventHandler<MouseEvent | KeyboardEvent>;
  isSelected?: boolean;
  onResolve?: (data: { url?: string; title?: string }) => void;
}
