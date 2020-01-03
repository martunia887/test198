import { CollabParticipant } from '../../editor-common/src';

export type ConnectedPayload = {
  doc: any;
  version: number;
  sid: string;
};

export type ParticipantPayload = {
  sessionId: string;
  timestamp: number;
};

export type TelepointerPayload = ParticipantPayload & {
  data: {
    type: 'textSelection' | 'nodeSelection';
    head: number;
    anchor: number;
  };
};

export type StepJson = {};

export type StepsPayload = {
  version: number;
  steps: StepJson & { userId: string }[];
};

export type ChannelEvent = {
  connected: ConnectedPayload;
  'participant:joined': ParticipantPayload;
  'participant:left': ParticipantPayload;
  'participant:telepointer': TelepointerPayload;
  'participant:updated': ParticipantPayload;
  'steps:commit': StepsPayload & { userId: string };
  'steps:added': StepsPayload;
};

export type CollabEvent = {
  init: Omit<ConnectedPayload, 'sid'>;
  connected: Pick<ConnectedPayload, 'sid'>;
  presence: {
    joined?: CollabParticipant[];
    left?: Pick<CollabParticipant, 'sessionId'>[];
  };
  telepointer: TelepointerPayload['data'];
  data: {
    json: StepJson[];
    version: number;
    userIds: string[];
  };
};

export interface Config {
  url: string;
  documentAri: string;
  userId: string;
}
