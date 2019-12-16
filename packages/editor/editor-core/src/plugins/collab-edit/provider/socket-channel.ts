import io from 'socket.io-client';
import { utils } from '@atlaskit/util-service-support';
import { EventEmitter2 } from 'eventemitter2';
import { getVersion, sendableSteps } from 'prosemirror-collab';
import { EditorState } from 'prosemirror-state';
import { Step } from 'prosemirror-transform';
import {
  Config,
  CollabEvent,
  PubSubClient,
  DocumentResponse,
  StepResponse,
  MixedResponse,
} from './types';
import { logger } from './';

export type ChannelEvent =
  | 'connected'
  | 'data'
  // | 'leader:changed'
  // | 'leader:latest'
  | 'participant:joined'
  | 'participant:left'
  // | 'participant:updated'
  | 'participant:telepointer'
  // | 'participant:request-catchup'
  // | 'request:catchup'
  | 'steps:commit'
  | 'steps:accepted';
// | 'steps:rejected'
// | 'title:changed'

export class Channel {
  private eventEmitter: EventEmitter2 = new EventEmitter2();
  private socket: SocketIOClient.Socket | undefined;
  private config: Config;
  private debounced?: number;
  private isSending?: boolean;
  private connected?: boolean;

  constructor(config: Config) {
    this.config = config;
  }

  /**
   * Get initial document from service
   */
  async getDocument(): Promise<DocumentResponse> {
    try {
      const { doc, version } = await utils.requestService<DocumentResponse>(
        this.config,
        {
          path: `document/${this.config.docId}`,
        },
      );

      return {
        doc,
        version,
      };
    } catch (err) {
      logger(
        `Collab-Edit: Document "${this.config.docId}" does not exist. Creating one locally.`,
      );
      return {
        doc: {},
        version: 1,
      };
    }
  }

  /**
   * Connect to service using websockets
   */
  async connect() {
    const { docId } = this.config;
    // const { doc, version } = await this.getDocument();

    const documentAri = `ari:cloud:demo::document/${docId}`;

    this.socket = io(`${this.config.url}/session/${documentAri}`, {
      transports: ['websocket', 'polling'],
    });

    this.socket.on('connect', this.onConnect);
    this.socket.on('data', this.onData);
    this.socket.on('participant:telepointer', this.onParticipantTelepointer);
    this.socket.on('participant:joined', this.onParticipantJoined);
    this.socket.on('participant:left', this.onParticipantLeft);
    // this.socket.on('participant:telepinter', this.onParticipantTelepointer);
    // this.socket.on('steps:accepted'. this.onStepsAccepted);

    // +  connect() {
    //   +    const { documentAri, url, socket } = this.config;
    //   +    this.socket = socket(`${url}/session/${documentAri}`, {
    //   +      transports: ['websocket', 'polling'],
    //   +    });
    //   +    this.socket.on('connect', this.onConnect);
    //   +    this.socket.on('leader:changed', this.onLeaderChanged);
    //   +    this.socket.on('leader:latest', this.onLeaderLatest);
    //   +    this.socket.on('participant:joined', this.onParcipantJoined);
    //   +    this.socket.on('participant:left', this.onParticipantLeft);
    //   +    this.socket.on('participant:updated', this.onParticipantUpdated);
    //   +    this.socket.on('participant:telepointer', this.onParticipantTelepointer);
    //   +    this.socket.on(
    //   +      'participant:request-catchup',
    //   +      this.onParticipantRequestCatchup,
    //   +    );
    //   +    this.socket.on('steps:commit', this.onStepsReceived);
    //   +    this.socket.on('steps:accepted', this.onStepsAccepted);
    //   +    this.socket.on('steps:rejected', this.onStepsRejected);
    //   +    this.socket.on('title:changed', this.onTitleChanged);
    //   +  }
    // this.eventEmitter.emit('')
  }

  private onConnect = (data: any) => {
    this.connected = true;

    // const { doc, version } = data;
    // this.eventEmitter.emit('connected', {
    //   doc,
    //   version,
    // });
  };

  private onData = (data: any) => {
    console.log('socket received', data);

    if (data.type === 'initial') {
      const { doc, version } = data;

      this.emit('connected', {
        doc,
        version,
        sid: this.socket!.id,
      });
    } else {
      if (data.steps) {
        this.isSending = false;
      }

      this.emit('data', data);
    }
  };

  private onParticipantTelepointer = (data: any) => {
    this.emit('participant:telepointer', data);
  };

  private onParticipantJoined = (data: any) => {
    this.emit('participant:joined', data);
  };

  private onParticipantLeft = (data: any) => {
    this.emit('participant:left', data);
  };

  /**
   * Get steps from version x to latest
   */
  async getSteps(version: number) {
    console.log('getsteps??');
  }

  private debounceSend(getState: () => any) {
    // logger(`Debouncing...`);

    if (this.debounced) {
      clearTimeout(this.debounced);
    }

    this.debounced = window.setTimeout(() => {
      // logger(`Sending debounced steps..`);
      this.sendSteps(getState(), getState);
    }, 250);
  }

  sendSteps(
    state: EditorState<any>,
    getState: () => any,
    localSteps?: Array<Step>,
  ) {
    if (this.isSending) {
      this.debounceSend(getState);
      return;
    }

    // if (!this.channel.isConnected) {
    //   logger(`Not connected yet`);
    //   return;
    // }

    const version = getVersion(state);

    // Don't send any steps before we're ready
    if (typeof version === undefined) {
      logger(`Version undefined.`);
      return;
    }

    const { steps }: { steps: Array<Step> } =
      localSteps || (sendableSteps(state) as any) || { steps: [] }; // sendableSteps can return null..

    if (steps.length === 0) {
      logger(`No steps to send. Aborting`);
      return;
    }

    logger(
      `Sending steps to leader. Version: ${version}, Steps: ${steps.length}`,
    );
    this.isSending = true;
    const { userId } = this.config;
    this.broadcast('steps:commit', {
      steps: steps.map(step => ({ ...step.toJSON(), userId })),
      version,
      userId,
    });
  }

  sendTelepointer(data: any) {
    this.broadcast('participant:telepointer', data);
  }

  broadcast(type: any, data: any) {
    if (!this.connected || !this.socket) {
      return;
    }

    this.socket.emit('broadcast', { type, ...data });
  }

  /**
   * Subscribe to events emitted by this channel
   */
  on(evt: ChannelEvent, handler: (...args: any) => void) {
    this.eventEmitter.on(evt, handler);
    return this;
  }

  /**
   * Unsubscribe from events emitted by this channel
   */
  off(evt: ChannelEvent, handler: (...args: any) => void) {
    this.eventEmitter.off(evt, handler);
    return this;
  }

  /**
   * Emit events to subscribers
   */
  private emit(evt: ChannelEvent, data: any) {
    this.eventEmitter.emit(evt, data);
    return this;
  }
}
