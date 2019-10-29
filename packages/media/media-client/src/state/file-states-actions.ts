import { FileState } from '../models/file-state';

export interface Action {
  type: string;
  success?: boolean;
  payload?: any;
}

export const INIT_ACTION = 'INIT_ACTION';
export const RESOLVE_FILE_STATE_ACTION = 'RESOLVE_FILE_STATE_ACTION';
export const RESOLVE_FILE_STATE_SUCCESS_ACTION =
  'RESOLVE_FILE_STATE_SUCCESS_ACTION';

export class InitAction implements Action {
  readonly type = INIT_ACTION;
}

export class ResolveFileStateAction implements Action {
  readonly type = RESOLVE_FILE_STATE_ACTION;

  constructor(
    public readonly payload: { id: string; collectionName?: string },
  ) {}
}

export class ResolveFileStateSuccessAction implements Action {
  readonly type = RESOLVE_FILE_STATE_SUCCESS_ACTION;
  readonly success = true;

  constructor(public readonly payload: { fileState: FileState }) {}
}

export type Actions =
  | Action
  | InitAction
  | ResolveFileStateAction
  | ResolveFileStateSuccessAction;
