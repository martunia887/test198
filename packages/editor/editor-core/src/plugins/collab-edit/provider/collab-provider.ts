import { EventEmitter2 } from 'eventemitter2';
import { getVersion, sendableSteps } from 'prosemirror-collab';
import { Transaction, EditorState } from 'prosemirror-state';
import {
  CollabEditProvider,
  CollabEvent,
  PubSubClient,
  StepResponse,
  Config,
  TelepointerData,
  Participant,
} from './types';
// import { Channel } from './channel';
import { Channel } from './socket-channel';
import { logger } from './';
import { getParticipant } from './mock-users';

export class CollabProvider implements CollabEditProvider {
  private eventEmitter: EventEmitter2 = new EventEmitter2();
  private channel: Channel;
  private queue: StepResponse[] = [];
  private config: Config;

  private getState = (): any => {};

  private participants: Map<string, Participant> = new Map();

  private sid?: string;

  constructor(config: Config, pubSubClient: PubSubClient) {
    this.config = config;
    // this.channel = new Channel(config, pubSubClient);
    this.channel = new Channel(config);
  }

  initialize(getState: () => any) {
    this.getState = getState;

    this.channel
      .on('connected', ({ doc, version, sid }) => {
        logger(`Joined collab-session. The document version is ${version}`);
        // const { userId } = this.config;

        this.sid = sid;

        this.emit('init', { sid, doc, version }) // Set initial document
          .emit('connected', { sid }); // Let the plugin know that we're connected an ready to go
      })
      .on('data', this.onReceiveData)
      .on('participant:telepointer', this.onParticipantTelepointer)
      .on('participant:joined', this.onParticipantJoined)
      .on('participant:left', this.onParticipantLeft)
      .connect();

    return this;
  }

  /**
   * Send steps from transaction to other participants
   */
  send(tr: Transaction, _oldState: EditorState, newState: EditorState) {
    // Ignore transactions without steps
    if (!tr.steps || !tr.steps.length) {
      return;
    }

    this.channel.sendSteps(newState, this.getState);
  }

  /**
   * Send messages, such as telepointers, to other participants.
   */
  sendMessage(data: any) {
    if (!data) {
      return;
    }

    const { type, ...rest } = data;
    switch (type) {
      case 'telepointer':
        this.channel.sendTelepointer({
          ...rest,
          timestamp: new Date().getTime(),
        });
    }
  }

  private queueTimeout?: number;
  private pauseQueue: boolean = false;

  private queueData(data: StepResponse) {
    logger(`Queuing data for version ${data.version}`);
    const orderedQueue = [...this.queue, data].sort((a, b) =>
      a.version > b.version ? 1 : -1,
    );

    this.queue = orderedQueue;

    if (!this.queueTimeout && !this.pauseQueue) {
      this.queueTimeout = window.setTimeout(() => {
        this.catchup();
      }, 1000);
    }
  }

  private async catchup() {
    this.pauseQueue = true;

    logger(`Too far behind - fetching data from service`);

    const currentVersion = getVersion(this.getState());

    try {
      const { doc, version, steps } = await this.channel.getSteps(
        currentVersion,
      );

      /**
       * Remove steps from queue where the version is older than
       * the version we received from service. Keep steps that might be
       * newer.
       */
      this.queue = this.queue.filter(data => data.version > version);

      // We are too far behind - replace the entire document
      if (doc) {
        logger(`Replacing document.`);
        const { userId } = this.config;

        const { steps: localSteps = [] } = sendableSteps(this.getState()) || {};

        // Replace local document and version number
        this.emit('init', { sid: userId, doc, version });

        // Re-aply local steps
        if (localSteps.length) {
          this.emit('local-steps', { steps: localSteps });
        }

        clearTimeout(this.queueTimeout);
        this.pauseQueue = false;
        this.queueTimeout = undefined;
      } else if (steps) {
        logger(`Applying the new steps. Version: ${version}`);
        this.onReceiveData({ steps, version }, true);
        clearTimeout(this.queueTimeout);
        this.pauseQueue = false;
        this.queueTimeout = undefined;
      }
    } catch (err) {
      logger(`Unable to get latest steps: ${err}`);
    }
  }

  private processQeueue() {
    if (this.pauseQueue) {
      logger(`Queue is paused. Aborting.`);
      return;
    }

    logger(`Looking for proccessable data`);

    if (this.queue.length === 0) {
      return;
    }

    const [firstItem] = this.queue;
    const currentVersion = getVersion(this.getState());
    const expectedVersion = currentVersion + firstItem.steps.length;

    if (firstItem.version === expectedVersion) {
      logger(`Applying data from queue!`);
      this.queue.splice(0, 1);
      this.processRemoteData(firstItem);
    }
  }

  private processRemoteData = (data: StepResponse, forceApply?: boolean) => {
    if (this.pauseQueue && !forceApply) {
      logger(`Queue is paused. Aborting.`);
      return;
    }

    const { version, steps } = data;

    logger(`Processing data. Version: ${version}`);

    if (steps && steps.length) {
      const userIds = steps.map(step => step.userId);
      this.emit('data', { json: steps, version, userIds });
    }

    this.processQeueue();
  };

  private onReceiveData = (data: StepResponse, forceApply?: boolean) => {
    const currentVersion = getVersion(this.getState());
    const expectedVersion = currentVersion + data.steps.length;

    if (data.version === currentVersion) {
      logger(`Received data we already have. Ignoring.`);
    } else if (data.version === expectedVersion) {
      this.processRemoteData(data, forceApply);
    } else if (data.version > expectedVersion) {
      logger(
        `Version too high. Expected ${expectedVersion} but got ${data.version}. Current local version is ${currentVersion}`,
      );
      this.queueData(data);
    }
  };

  /**
   * Called when a participant joins the session.
   *
   * We keep track of participants internally in this class, and emit the `presence` event to update
   * the active avatars in the editor.
   *
   */
  private onParticipantJoined = ({ sessionId, timestamp }: any) => {
    logger(`Participant joined`);
    this.updateParticipant({ sessionId, timestamp });

    // We should let the new particpant know about us!
    this.channel.broadcast('participant:updated', { sessionId: this.sid });
  };

  private onParticipantUpdated = ({ sessionId, timestamp }: any) => {
    logger(`Participant updated`);
    this.updateParticipant({ sessionId, timestamp });
  };

  /**
   * Called when a participant leavs the session.
   *
   * We emit the `presence` event to update the active avatars in the editor.
   */
  private onParticipantLeft = ({ sessionId }: any) => {
    logger(`Participant left`);

    this.participants.delete(sessionId);
    this.emit('presence', { left: [{ sessionId }] });
  };

  private onParticipantTelepointer = ({ sessionId, timestamp, data }: any) => {
    if (sessionId === this.sid) {
      return;
    }

    const participant = this.participants.get(sessionId);

    // Ignore old telepointer events.
    if (participant && participant.lastActive > timestamp) {
      return;
    }

    logger(`Remote telepointer from ${sessionId}.`);

    // Set last active
    this.updateParticipant({ sessionId, timestamp });
    this.emit('telepointer', data);
  };

  private updateParticipant = (
    { sessionId, timestamp }: any,
    isLeader?: boolean,
  ) => {
    const { name = '', email = '', avatar = '' } = getParticipant(sessionId);

    this.participants.set(sessionId, {
      name,
      email,
      avatar,
      sessionId,
      lastActive: timestamp,
    });

    // Collab-plugin expects an array of users that joined.
    const joined = [this.participants.get(sessionId)];

    // Filter out participants that's been inactive for more than 5 minutes.
    const now = new Date().getTime();
    const left = Array.from(this.participants.values()).filter(
      p => (now - p.lastActive) / 1000 > 300,
    );
    left.forEach(p => this.participants.delete(p.sessionId));
    this.emit('presence', { joined, left });
  };

  private onReceiveTelepointer = (
    data: TelepointerData & { timestamp: number },
  ) => {
    const { sessionId } = data;

    if (sessionId === this.config.userId) {
      return;
    }

    console.log({ sessionId });

    const participant = this.participants.get(sessionId);

    if (participant && participant.lastActive > data.timestamp) {
      logger(`Old telepointer event. Ignoring.`);
      return;
    }

    this.updateParticipant(sessionId, data.timestamp);
    logger(`Remote telepointer from ${sessionId}`);

    this.emit('telepointer', data);
  };

  /**
   * Emit events to subscribers
   */
  private emit(evt: CollabEvent, data: any) {
    this.eventEmitter.emit(evt, data);
    return this;
  }

  /**
   * Subscribe to events emitted by this provider
   */
  on(evt: CollabEvent, handler: (...args: any) => void) {
    this.eventEmitter.on(evt, handler);
    return this;
  }

  /**
   * Unsubscribe from events emitted by this provider
   */
  off(evt: CollabEvent, handler: (...args: any) => void) {
    this.eventEmitter.off(evt, handler);
    return this;
  }

  /**
   * Unsubscribe from all events emitted by this provider.
   */
  unsubscribeAll(evt: CollabEvent) {
    this.eventEmitter.removeAllListeners(evt);
    return this;
  }
}
