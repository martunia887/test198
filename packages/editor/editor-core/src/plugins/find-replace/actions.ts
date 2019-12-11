import { DecorationSet } from 'prosemirror-view';
import { Match } from './types';

export enum FindReplaceActionTypes {
  ACTIVATE = 'ACTIVATE',
  FIND = 'FIND',
  UPDATE_DECORATIONS = 'UPDATE_DECORATIONS',
  FIND_NEXT = 'FIND_NEXT',
  FIND_PREV = 'FIND_PREV',
  REPLACE = 'REPLACE',
  REPLACE_ALL = 'REPLACE_ALL',
  CANCEL = 'CANCEL',
  UNFOCUS = 'UNFOCUS',
}

export interface Activate {
  type: FindReplaceActionTypes.ACTIVATE;
  findText?: string;
  matches?: Match[];
  index?: number;
  selectionPos: number;
}

export interface Find {
  type: FindReplaceActionTypes.FIND;
  findText: string;
  matches: Match[];
  index: number;
  selectionPos: number;
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

export interface Unfocus {
  type: FindReplaceActionTypes.UNFOCUS;
}

export interface UpdateDecorations {
  type: FindReplaceActionTypes.UPDATE_DECORATIONS;
  decorationSet: DecorationSet;
}

export type FindReplaceAction =
  | Activate
  | Find
  | FindNext
  | FindPrev
  | Replace
  | ReplaceAll
  | Cancel
  | Unfocus
  | UpdateDecorations;
