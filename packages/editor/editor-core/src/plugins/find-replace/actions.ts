import { Match } from './types';

export enum FindReplaceActionTypes {
  ACTIVATE = 'ACTIVATE',
  FIND = 'FIND',
  FIND_NEXT = 'FIND_NEXT',
  FIND_PREV = 'FIND_PREV',
  REPLACE = 'REPLACE',
  REPLACE_ALL = 'REPLACE_ALL',
  CANCEL = 'CANCEL',
}

export interface Activate {
  type: FindReplaceActionTypes.ACTIVATE;
  findText?: string;
  matches?: Match[];
  index?: number;
}

export interface Find {
  type: FindReplaceActionTypes.FIND;
  findText: string;
  matches: Match[];
  index: number;
}

export interface FindNext {
  type: FindReplaceActionTypes.FIND_NEXT;
}

export interface FindPrev {
  type: FindReplaceActionTypes.FIND_PREV;
}

export interface Replace {
  type: FindReplaceActionTypes.REPLACE;
  replaceText: string;
}

export interface ReplaceAll {
  type: FindReplaceActionTypes.REPLACE_ALL;
  replaceText: string;
}

export interface Cancel {
  type: FindReplaceActionTypes.CANCEL;
}

export type FindReplaceAction =
  | Activate
  | Find
  | FindNext
  | FindPrev
  | Replace
  | ReplaceAll
  | Cancel;
