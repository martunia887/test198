import { TaskState } from '@atlaskit/task-decision';

export interface TaskDecisionBridge {
  updateTask(taskId: string, state: TaskState);
}

export interface LinkBridge {
  onLinkClick(url: string);
}

export interface MediaBridge {
  onMediaClick(mediaId: string, occurrenceKey?: string | null): void;
}

export default interface WebBridge
  extends LinkBridge,
    TaskDecisionBridge,
    MediaBridge {}

export interface RendererBridges {
  linkBridge?: LinkBridge;
  taskDecisionBridge?: TaskDecisionBridge;
  mediaBridge?: MediaBridge;
}

export type RendererPluginBridges = keyof RendererBridges;

declare global {
  interface Window extends RendererBridges {
    webkit?: any;
  }
}
