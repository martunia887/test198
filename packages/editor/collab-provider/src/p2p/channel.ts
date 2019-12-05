import { Config, Socket } from './';
import { Emitter } from './emitter';
import { createLogger } from '../utils';

const logger = createLogger('Socket', 'green');

export type ChannelEvent =
  | 'connected'
  | 'leader:changed'
  | 'leader:latest'
  | 'participant:joined'
  | 'participant:left'
  | 'participant:updated'
  | 'participant:telepointer'
  | 'participant:request-catchup'
  | 'request:catchup'
  | 'steps:commit'
  | 'steps:accepted'
  | 'steps:rejected'
  | 'title:changed';

export interface Payload<T = any> {
  sessionId: string;
  timestamp: number;
  data: T;
}

export interface StepData {
  steps: { userId: string }[];
  version: number;
}

export class Channel extends Emitter<ChannelEvent> {
  private config: Config;
  private socket: Socket | undefined;
  private leader: string | undefined;
  private connected: boolean = false;

  get isLeader() {
    return this.socket && this.socket.id === this.leader;
  }

  get leaderId() {
    return this.leader;
  }

  get isConnected() {
    return this.connected;
  }

  constructor(config: Config) {
    super();
    this.config = config;
  }

  connect() {
    const { documentAri, url, socket } = this.config;
    this.socket = socket(`${url}/session/${documentAri}`, {
      transports: ['websocket', 'polling'],
    });
    this.socket.on('connect', this.onConnect);
    this.socket.on('leader:changed', this.onLeaderChanged);
    this.socket.on('leader:latest', this.onLeaderLatest);
    this.socket.on('participant:joined', this.onParcipantJoined);
    this.socket.on('participant:left', this.onParticipantLeft);
    this.socket.on('participant:updated', this.onParticipantUpdated);
    this.socket.on('participant:telepointer', this.onParticipantTelepointer);
    this.socket.on(
      'participant:request-catchup',
      this.onParticipantRequestCatchup,
    );
    this.socket.on('steps:commit', this.onStepsReceived);
    this.socket.on('steps:accepted', this.onStepsAccepted);
    this.socket.on('steps:rejected', this.onStepsRejected);
    this.socket.on('title:changed', this.onTitleChanged);
  }

  disconnect() {
    if (!this.socket) {
      return;
    }

    this.socket.disconnect();
  }

  private onParticipantRequestCatchup = (data: any) => {};

  private onTitleChanged = (data: any) => {
    this.emit('title:changed', data);
  };

  private onConnect = () => {
    if (!this.socket) {
      return;
    }

    logger('Socket connected', this.socket.id);
    this.connected = true;
    this.emit('connected', { sid: this.socket.id });
  };

  private onLeaderChanged = (data: any) => {
    logger('changed leader', data);
    const { leader } = data;

    this.leader = leader;

    if (this.isLeader) {
      logger(`We're leader now.`);
    }
    this.emit('leader:changed', data);
  };

  private onLeaderLatest = (data: any) => {
    logger('Latest state from leader', data);
    this.emit('leader:latest', data);
  };

  private onParcipantJoined = (data: any) => {
    logger('participant joined');
    this.emit('participant:joined', data);
  };

  private onParticipantLeft = (data: any) => {
    logger('participant left');
    this.emit('participant:left', data);
  };

  private onParticipantUpdated = (data: any) => {
    logger('participant updated');
    this.emit('participant:updated', data);
  };

  private onParticipantTelepointer = (data: any) => {
    this.emit('participant:telepointer', data);
  };

  private onStepsReceived = (data: any) => {
    if (!this.isLeader) {
      logger(`Received steps. But we're not leader.. ignoring.`);
      return;
    }

    logger('Received Steps');
    this.emit('steps:commit', data);
  };

  private onStepsAccepted = (data: any) => {
    this.emit('steps:accepted', data);
  };

  private onStepsRejected = (data: any) => {
    this.emit('steps:rejected', data);
  };

  broadcast(type: ChannelEvent, data: any) {
    if (!this.connected || !this.socket) {
      return;
    }

    this.socket.emit('broadcast', { type, ...data });
  }
}
