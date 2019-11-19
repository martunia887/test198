import { MediaState } from '../types';

export interface LightMediaPluginState {
  waitForMediaUpload: boolean;
  waitForPendingTasks(
    timeout?: number,
    lastTask?: Promise<MediaState | null>,
  ): Promise<any>;
}
