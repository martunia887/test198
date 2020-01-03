import io from 'socket.io-client';

import { Emitter } from './emitter';
import {
  ChannelEvent,
  Config,
  TelepointerPayload,
  ParticipantPayload,
  StepsPayload,
} from './types';

import { createLogger } from './utils';

const logger = createLogger('Channel', 'green');

export class Channel extends Emitter<ChannelEvent> {
  private connected: boolean = false;
  private config: Config;
  private socket: SocketIOClient.Socket | null = null;

  constructor(config: Config) {
    super();
    this.config = config;
  }

  /**
   * Connct to collab service using websockets
   */
  connect() {
    const { documentAri, url } = this.config;
    this.socket = io(`${url}/session/${documentAri}`, {
      transports: ['websocket', 'polling'],
    });

    this.socket.on('connect', this.onConnect);
    this.socket.on('data', this.onReceiveData);
    this.socket.on('steps:added', (data: StepsPayload) => {
      this.emit('steps:added', data);
    });
    this.socket.on('participant:telepointer', (data: TelepointerPayload) => {
      this.emit('participant:telepointer', data);
    });
    this.socket.on('participant:joined', (data: ParticipantPayload) => {
      this.emit('participant:joined', data);
    });
    this.socket.on('participant:left', (data: ParticipantPayload) => {
      this.emit('participant:left', data);
    });
  }

  private onConnect = (data: any) => {
    this.connected = true;
    logger('Connected.');
  };

  private onReceiveData = (data: any) => {
    logger('Received data', data);

    if (data.type === 'initial') {
      const { doc, version } = data;
      this.emit('connected', {
        doc,
        version,
        sid: this.socket!.id,
      });
    } else {
      this.emit('steps:added', data);
    }
  };

  /**
   * Send message to service. Timestamp will be added server side.
   */
  broadcast<K extends keyof ChannelEvent>(
    type: K,
    data: Omit<ChannelEvent[K], 'timestamp'>,
  ) {
    if (!this.connected || !this.socket) {
      return;
    }

    this.socket.emit('broadcast', { type, ...data });
  }

  disconnect() {
    this.unsubscribeAll();

    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}
