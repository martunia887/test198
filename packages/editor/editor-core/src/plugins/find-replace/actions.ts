import { Match } from './types';

export enum FindReplaceActionTypes {
  ACTIVATE = 'ACTIVATE',
  FIND = 'FIND',
  REPLACE = 'REPLACE',
  REPLACE_ALL = 'REPLACE_ALL',
  CANCEL = 'CANCEL',
}

export interface Activate {
  type: FindReplaceActionTypes.ACTIVATE;
}

export interface Find {
  type: FindReplaceActionTypes.FIND;
  searchWord: string;
  matches: Match[];
}

export interface Replace {
  type: FindReplaceActionTypes.REPLACE;
  replaceWord: string;
}

export interface ReplaceAll {
  type: FindReplaceActionTypes.REPLACE_ALL;
  replaceWord: string;
}

export interface Cancel {
  type: FindReplaceActionTypes.CANCEL;
}

export type FindReplaceAction = Activate | Find | Replace | ReplaceAll | Cancel;
