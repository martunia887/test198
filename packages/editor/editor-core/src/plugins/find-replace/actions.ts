export enum FindReplaceActionTypes {
  ACTIVATE = 'ACTIVATE',
  FIND = 'FIND',
  REPLACE = 'REPLACE',
  CANCEL = 'CANCEL',
}

export interface Activate {
  type: FindReplaceActionTypes.ACTIVATE;
}

export interface Find {
  type: FindReplaceActionTypes.FIND;
  searchWord: string;
}

export interface Replace {
  type: FindReplaceActionTypes.REPLACE;
  searchWord: string;
  replaceWord: string;
}

export interface Cancel {
  type: FindReplaceActionTypes.CANCEL;
}

export type FindReplaceAction = Activate | Find | Replace | Cancel;
