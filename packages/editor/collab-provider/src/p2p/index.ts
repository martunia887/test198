import { CollabEditProvider } from '@atlaskit/editor-core';
import { getVersion, sendableSteps } from 'prosemirror-collab';
import { Transaction, EditorState } from 'prosemirror-state';
import { Step } from 'prosemirror-transform';
import { CollabEvent } from '../types';
import { getParticipant, getSendableSelection, createLogger } from '../utils';

import { StepRepository } from './repo';
import { Channel, Payload, StepData } from './channel';

import { Emitter } from './emitter';

const logger = createLogger('Provider', 'blue');

export interface Config {
  url: string;
  documentAri: string;
  // userId: string;
}

export class P2PCollabProvider extends Emitter<CollabEvent>
  implements CollabEditProvider {
  // private config: Config;
  private channel: Channel;
  private repo: StepRepository;
  private sid: string;
  private userId: string;

  private getState = (): any => {};
  private title: string;

  private isSending: boolean = false;
  private debounced: number | undefined;

  private participants: Map<string, any> = new Map();

  constructor(config: Config) {
    super();
    // this.config = config;
    this.channel = new Channel(config);

    window.addEventListener('offline', () => {
      const left = Array.from(this.participants.values());
      left.forEach(p => this.participants.delete(p.sessionId));
      this.emit('presence', { left });
      // const left = Array.from(this.participants.values()).filter(
      //   p => (now - p.lastActive) / 1000 > 300,
      // );
      // left.forEach(p => this.participants.delete(p.sessionId));
      // this.emit('presence', { joined, left });
    });
  }

  initialize(getState: () => any): this {
    this.getState = getState;

    // Quick-hack to get clientID from native collab-plugin.
    this.userId = getState().plugins.find(
      (p: any) => p.key === 'collab$',
    ).spec.config.clientID;
    this.repo = new StepRepository(this.userId, this.getState, this.channel)
      .on('steps:added', this.onStepsAdded)
      .on('request:catchup', this.onRequestCatchup);

    // Initialize editor with current document.
    const { doc, version } = this.repo;

    this.emit('init', { version, doc });

    this.channel
      .on('connected', this.onConnected)
      .on('leader:changed', this.onLeaderChanged)
      .on('leader:latest', this.onLeaderLatest)
      .on('participant:joined', this.onParticipantJoined)
      .on('participant:left', this.onParticipantLeft)
      .on('participant:updated', this.onParticipantUpdated)
      .on('participant:telepointer', this.onParticipantTelepointer)
      .on('steps:commit', this.onStepsReceived)
      .on('steps:accepted', this.onStepsAccepted)
      .on('steps:rejected', this.onStepsRejected)
      .on('title:changed', this.onTitleChanged)
      .connect();

    return this;
  }

  private onRequestCatchup = () => {
    this.channel.broadcast('participant:request-catchup', {});
  };

  private onTitleChanged = ({ data }: any) => {
    this.title = data.title;
    this.emit('titleChange', data.title);
  };

  /**
   * Send steps
   */
  send(
    tr: Transaction<any>,
    oldState: EditorState<any>,
    newState: EditorState<any>,
  ) {
    if (!tr.steps || tr.steps.length === 0) {
      return;
    }

    this.sendSteps(newState);
  }

  private debounceSend() {
    logger(`Debouncing...`);

    if (this.debounced) {
      clearTimeout(this.debounced);
    }

    this.debounced = window.setTimeout(() => {
      logger(`Sending debounced steps..`);
      this.sendSteps(this.getState());
    }, 250);
  }

  private sendSteps(state: EditorState<any>, localSteps?: Array<Step>) {
    if (this.isSending) {
      this.debounceSend();
      return;
    }

    const version = getVersion(state);

    // Don't send any steps before we're ready
    if (typeof version === undefined) {
      logger(`Version undefined.`);
      return;
    }

    const { steps }: { steps: Array<Step> } =
      localSteps || ((sendableSteps(state) as any) || { steps: [] }); // sendableSteps can return null..

    if (steps.length === 0) {
      logger(`No steps to send. Aborting`);
      return;
    }

    logger(
      `Sending steps to leader. Version: ${version}, Steps: ${steps.length}`,
    );
    this.isSending = true;
    const { userId } = this;
    this.channel.broadcast('steps:commit', {
      steps: steps.map(step => ({ ...step.toJSON(), userId })),
      version,
    });
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
   * Called as soon as a connection is established with backend-service.
   *
   * We want to emit the `init` and `connected` event asap to unblock the editor.
   */
  private onConnected = ({ sid }: any) => {
    logger(`Joined collab-session. SessionID: ${sid}`);
    this.sid = sid;
    this.emit('connected', { sid });

    // Send our telepointer as well.
    const selection = getSendableSelection(this.getState().selection);
    this.channel.broadcast('participant:telepointer', {
      sessionId: this.sid,
      selection,
    });
  };

  private onLeaderChanged = ({ timestamp, leader }: any) => {
    if (this.channel.isLeader) {
      this.repo.setAsLeader();

      // Send our latest state to everyone. Just in case
      this.channel.broadcast('leader:latest', {
        doc: this.repo.doc,
        version: this.repo.version,
      });
    }

    this.updateParticipant({ sessionId: leader, timestamp }, true);
  };

  private onLeaderLatest = ({ data }: any) => {
    if (this.channel.isLeader) {
      return;
    }

    const { doc, steps = [], version } = data;

    if (version === this.repo.version) {
      // Ignore if version match whatever we have...
      return;
    }

    logger(`Resetting to latest from leader. ${version}`, {
      dataVersion: data.version,
      repoVersion: this.repo.version,
      stateVersion: getVersion(this.getState()),
    });

    // Get local unconfirmed steps
    const { steps: localSteps = [] } = sendableSteps(this.getState()) || {};

    // Reset repo and document to leader state.
    this.repo.reset(steps, version);
    this.emit('init', {
      doc,
      version,
    });

    // Re-aply local steps
    if (localSteps.length) {
      logger(`Re-applying local steps`, localSteps);
      const mappedSteps = localSteps.map(step => step.toJSON());
      const { schema } = this.getState();
      this.emit('local-steps', {
        steps: mappedSteps.map(step => Step.fromJSON(schema, step)),
      });
    }

    this.isSending = false;
  };

  /**
   * Called when a participant joins the session.
   *
   * We keep track of participants internally in this class, and emit the `presence` event to update
   * the active avatars in the editor.
   *
   */
  private onParticipantJoined = ({ sessionId, timestamp }: Payload) => {
    logger(`Participant joined`);
    this.updateParticipant({ sessionId, timestamp });

    // We should let the new particpant know about us!
    this.channel.broadcast('participant:updated', { sessionId: this.sid });

    // If we're leader - send latest document to participant.
    if (this.channel.isLeader) {
      this.channel.broadcast('leader:latest', {
        sessionId,
        doc: this.repo.doc,
        version: this.repo.version,
      });
    }
  };

  private onParticipantUpdated = ({ sessionId, timestamp }: Payload) => {
    logger(`Participant updated`);
    this.updateParticipant({ sessionId, timestamp });
  };

  /**
   * Called when a participant leavs the session.
   *
   * We emit the `presence` event to update the active avatars in the editor.
   */
  private onParticipantLeft = ({ sessionId }: Payload) => {
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
    { sessionId, timestamp }: Pick<Payload, 'sessionId' | 'timestamp'>,
    isLeader?: boolean,
  ) => {
    const { name = '', email = '', avatar = '' } = getParticipant(sessionId);

    this.participants.set(sessionId, {
      name,
      email,
      avatar,
      sessionId,
      lastActive: timestamp,
      isLeader: isLeader || sessionId === this.channel.leaderId,
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

  /**
   * Called when we receive steps from a participant (if we're leader).
   */
  private onStepsReceived = ({
    sessionId,
    timestamp,
    data,
  }: Payload<StepData>) => {
    logger(`Received steps from ${sessionId}`, {
      dataVersion: data.version,
      repoVersion: this.repo.version,
      stateVersion: getVersion(this.getState()),
    });

    const { steps, version } = data;

    if (
      this.repo.addSteps(
        steps,
        version,
        // (sessionId === this.sid && this.channel.isLeader)
      )
    ) {
      this.channel.broadcast('steps:accepted', {
        steps,
        version: this.repo.version, // + steps.length,
      });
    } else {
      logger(
        `Steps rejected. Repo version is ${
          this.repo.version
        } and remote version was ${version}.`,
      );
      this.channel.broadcast('steps:rejected', {
        sessionId,
        steps: this.repo.getSteps(version),
        version: this.repo.version,
      });
    }
  };

  /**
   * Called when leader have accepted steps from a participant.
   */
  private onStepsAccepted = (
    { sessionId, timestamp, data }: Payload<StepData>,
    forceApply?: boolean,
  ) => {
    logger(`Steps accepted!`, {
      dataVersion: data.version,
      repoVersion: this.repo.version,
      stateVersion: getVersion(this.getState()),
    });

    if (data.steps.some(s => s.userId === this.userId)) {
      this.isSending = false;
    }

    // TODO: Update parcipant based on timestamp?
    this.updateParticipant({ sessionId, timestamp });

    this.repo.processSteps(data, forceApply);
  };

  /**
   * Called when leader rejected the steps we sent.
   *
   * `data` contains the steps we're missing as well as the version.
   */
  private onStepsRejected = ({ data }: Payload<StepData>) => {
    // return;
    logger(`Applying steps from leader.`, {
      dataVersion: data.version,
      repoVersion: this.repo.version,
      stateVersion: getVersion(this.getState()),
    });

    this.isSending = false;

    this.repo.processSteps(data, true);
  };

  /**
   * Called when new steps have been added in the StepRepository.
   */
  private onStepsAdded = ({ version, steps }: StepData) => {
    if (steps && steps.length) {
      const userIds = steps.map((step: any) => step.userId);

      if (userIds.some(u => u === this.userId)) {
        this.isSending = false;
      }

      logger(`Steps Added`, {
        userIds,
        isSending: this.isSending,
        steps,
        version,
        repoVersion: this.repo.version,
        stateVersion: getVersion(this.getState()),
      });
      this.emit('data', { json: steps, version, userIds });

      // If our step was accepted - send our telepointer again to make sure
      // it's in sync.
      if (userIds.some(id => id === this.userId)) {
        const selection = getSendableSelection(this.getState().selection);
        this.channel.broadcast('participant:telepointer', {
          sessionId: this.sid,
          selection,
        });
      }
    }
  };

  setTitle(title: string, broadcast: boolean = true) {
    this.title = title;

    if (broadcast) {
      this.channel.broadcast('title:changed', { title });
    }
  }

  async getFinalAcknowledgedState() {
    return {
      content: {
        title: this.title,
        adf: this.getState().doc.toJSON(),
      },
    };
  }

  disconnect() {
    return this.unsubscribeAll();
  }

  /**
   * Unsubscribe from all events emitted by this provider.
   */
  unsubscribeAll(evt?: CollabEvent) {
    super.unsubscribeAll(evt);
    this.channel.unsubscribeAll();
    this.channel.disconnect();
    this.repo.unsubscribeAll();
    return this;
  }
}
