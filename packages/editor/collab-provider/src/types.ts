export type CollabEvent =
  | 'init'
  | 'connected'
  | 'data'
  | 'telepointer'
  | 'presence'
  | 'error'
  | 'local-steps'
  | 'editor-appearance';

export interface SendableSelection {
  type: 'textSelection' | 'nodeSelection';
  anchor: number;
  head: number;
}
