import { FileState } from '../models/file-state';

export type EventPayloadMap<P> = {
  readonly [event: string]: P;
};

export type EventPayloadListener<
  M extends EventPayloadMap<P>,
  E extends keyof M,
  P = any
> = (payload: M[E]) => void;

export type UploadEventPayloadMap = {
  'file-added': FileState;
};
