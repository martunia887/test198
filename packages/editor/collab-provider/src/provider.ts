import { CollabEditProvider, CollabParticipant } from '@atlaskit/editor-common';
import { getVersion, sendableSteps } from 'prosemirror-collab';
import { EditorState, Transaction } from 'prosemirror-state';

import { Emitter } from './emitter';
import { Channel } from './channel';
import {
  CollabEvent,
  Config,
  ParticipantPayload,
  StepsPayload,
  TelepointerPayload,
} from './types';

import { createLogger, getParticipant } from './utils';

const logger = createLogger('Provider', 'yellow');

export class Provider extends Emitter<CollabEvent>
  implements CollabEditProvider {
  private participants: Map<string, CollabParticipant> = new Map();
  private channel: Channel;
  private config: Config;
  private getState: (() => EditorState) | undefined;
  private sid?: string;
  private debouncedSend: number | undefined;
  private isSending: boolean = false;

  constructor(config: Config) {
    super();
    this.config = config;
    this.channel = new Channel(config);
  }

  /**
   * Called by collab plugin in editor when it's ready to
   * initialize a collab session.
   */
  initialize(getState: () => EditorState): this {
    this.getState = getState;

    this.channel
      .on('connected', ({ doc, version, sid }) => {
        this.sid = sid;

        this.emit('init', { doc, version }) // Initial document and version
          .emit('connected', { sid });
      })
      .on('steps:added', this.onStepsAdded)
      .on('participant:telepointer', this.onParticipantTelepointer)
      .on('participant:joined', this.onParticipantJoined)
      .on('participant:left', this.onParticipantLeft)
      .on('participant:updated', this.onParticipantUpdated)
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

    this.sendSteps(newState);
  }

  private sendSteps(state: EditorState) {
    // Debounce if we're already sending steps.
    if (this.isSending) {
      clearTimeout(this.debouncedSend);

      this.debouncedSend = window.setTimeout(() => {
        this.sendSteps(this.getState!());
      }, 250);
      return;
    }

    const sendable = sendableSteps(state);

    // Don't send any steps before we're ready.
    if (!sendable) {
      return;
    }

    const { steps, version } = sendable;
    const { userId } = this.config;
    this.isSending = true;
    this.channel.broadcast('steps:commit', {
      steps: steps.map(step => ({ ...step.toJSON(), userId })),
      version,
      userId,
    });
  }

  /**
   * Called when we receive steps from the service
   */
  private onStepsAdded = (data: StepsPayload, forceApply?: boolean) => {
    logger(`Received steps`, { steps: data.steps, version: data.version });

    this.isSending = false;
    const currentVersion = getVersion(this.getState!());
    const expectedVersion = currentVersion + data.steps.length;

    if (data.version === currentVersion) {
      logger(`Received steps we already have. Ignoring.`);
    } else if (data.version === expectedVersion) {
      this.processSteps(data, forceApply);
    } else if (data.version > expectedVersion) {
      logger(
        `Version too high. Expected "${expectedVersion}" but got "${data.version}. Current local version is ${currentVersion}.`,
      );
      this.queueSteps(data);
    }
  };

  private queueTimeout: number | undefined;
  private pauseQueue?: boolean;
  private queue: StepsPayload[] = [];
  private queueSteps(data: StepsPayload) {
    logger(`Queueing data for version "${data.version}".`);

    const orderedQueue = [...this.queue, data].sort((a, b) =>
      a.version > b.version ? 1 : -1,
    );

    this.queue = orderedQueue;

    if (!this.queueTimeout && !this.pauseQueue) {
      this.queueTimeout = window.setTimeout(() => {
        this.requestCatchup();
      }, 10000);
    }
  }

  private async requestCatchup() {
    this.pauseQueue = true;
    logger(`Too far behind - fetching data from service.`);
  }

  private processQueue() {
    if (this.pauseQueue) {
      logger(`Queue is paused. Aborting.`);
      return;
    }

    logger(`Looking for processable data.`);

    if (this.queue.length === 0) {
      return;
    }

    const [firstItem] = this.queue;
    const currentVersion = getVersion(this.getState!());
    const expectedVersion = currentVersion + firstItem.steps.length;

    if (firstItem.version === expectedVersion) {
      logger(`Applying data from queue!`);
      this.queue.splice(0, 1);
      this.processSteps(firstItem);
    }
  }

  private processSteps(data: StepsPayload, forceApply?: boolean) {
    if (this.pauseQueue && !forceApply) {
      logger(`Queue is paused. Aborting.`);
      return;
    }

    const { version, steps } = data;
    logger(`Processing data. Version "${version}".`);

    if (steps && steps.length) {
      const userIds = steps.map(({ userId }) => userId);
      this.emit('data', { json: steps, version, userIds });
    }

    this.processQueue();
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
        this.channel.broadcast('participant:telepointer', rest);
        break;
    }
  }

  /**
   * Called when a participant joins the session.
   *
   * We keep track of participants internally in this class, and emit the `presence` event to update
   * the active avatars in the editor.
   *
   */
  private onParticipantJoined = ({
    sessionId,
    timestamp,
  }: ParticipantPayload) => {
    logger('Participant joined', sessionId);
    this.updateParticipant({ sessionId, timestamp });

    // We should let the new particpant know about us!
    this.channel.broadcast('participant:updated', { sessionId: this.sid! });
  };

  /**
   * Called when a participant leavs the session.
   *
   * We emit the `presence` event to update the active avatars in the editor.
   */
  private onParticipantLeft = ({ sessionId }: ParticipantPayload) => {
    logger(`Participant left`);

    this.participants.delete(sessionId);
    this.emit('presence', { left: [{ sessionId }] });
  };

  /**
   * Called when we receive an update event from another participant.
   */
  private onParticipantUpdated = ({
    sessionId,
    timestamp,
  }: ParticipantPayload) => {
    logger(`Participant updated`);
    this.updateParticipant({ sessionId, timestamp });
  };

  /**
   * Called when we receive a telepointer update from another
   * participant.
   */
  private onParticipantTelepointer = ({
    sessionId,
    timestamp,
    data,
  }: TelepointerPayload) => {
    if (sessionId === this.sid) {
      return;
    }

    const participant = this.participants.get(sessionId);

    // Ignore old telepointer events
    if (participant && participant.lastActive > timestamp) {
      return;
    }

    // Set last active
    this.updateParticipant({ sessionId, timestamp });
    this.emit('telepointer', data);
  };

  private updateParticipant = ({
    sessionId,
    timestamp,
  }: ParticipantPayload) => {
    const { name = '', email = '', avatar = '' } = getParticipant(sessionId);

    this.participants.set(sessionId, {
      name,
      email,
      avatar,
      sessionId,
      lastActive: timestamp,
    });

    // Collab-plugin expects an array of users that joined.
    const joined = [this.participants.get(sessionId)!];

    // Filter out participants that's been inactive for more than 5 minutes.
    const now = new Date().getTime();
    const left = Array.from(this.participants.values()).filter(
      p => (now - p.lastActive) / 1000 > 300,
    );

    left.forEach(p => this.participants.delete(p.sessionId));

    this.emit('presence', { joined, left });
  };

  disconnect() {
    return this.unsubscribeAll();
  }

  /**
   * Unsubscribe from all events emitted by this provider.
   */
  unsubscribeAll() {
    super.unsubscribeAll();
    this.channel.disconnect();
    return this;
  }
}
