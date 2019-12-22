import { JsonLd } from '../client/types';
import { CardType } from './store/types';

export interface CardStore {
  [key: string]: CardState;
}
export interface CardState {
  status: CardType;
  details?: JsonLd;
  lastUpdatedAt: number;
}
