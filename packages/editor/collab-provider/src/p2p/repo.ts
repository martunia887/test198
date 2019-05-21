import { EditorState } from 'prosemirror-state';
import { getVersion, sendableSteps } from 'prosemirror-collab';
import { Step } from 'prosemirror-transform';
import { createLogger } from '../utils';
import { StepData, Channel } from './channel';
import { Emitter } from './emitter';

const logger = createLogger('Repo', 'purple');

export class StepRepository extends Emitter {
  private channel: Channel;
  private queue: StepData[] = [];
  private queueTimeout?: number;
  private pauseQueue: boolean = false;
  private userId: string;
  private _version: number;
  private _steps: any[];

  get version(): number {
    return this._version;
  }

  get steps() {
    return this._steps;
  }

  get doc() {
    return this.getState().doc.toJSON();
  }

  private getState: () => EditorState;

  constructor(userId: string, getState: () => any, channel: Channel) {
    super();
    this.userId = userId;
    this.getState = getState;
    this._steps = [];
    this._version = 0;
    this.channel = channel;
  }

  reset(steps: any[] = [], version: number) {
    this._steps = steps;
    this._version = version;

    window.clearTimeout(this.queueTimeout);
    this.queueTimeout = undefined;
    this.queue = [];
    this.pauseQueue = false;
  }

  getSteps(fromVersion: number) {
    return this.steps.slice(fromVersion);
  }

  addSteps(steps: Array<any>, version: number, accepted?: boolean) {
    if (version !== this.version && !accepted) {
      return false;
    }

    steps.forEach(step => {
      this._steps.push(step);
    });

    this._version = this._version + steps.length;

    return true;
  }

  setAsLeader() {
    logger(`Setting leader to us.`);
    this._steps = [];

    // Confirm our local steps
    const state = this.getState();
    const { steps }: { steps: Array<Step> } = (sendableSteps(state) as any) || {
      steps: [],
    }; // sendableSteps can return null..
    const version = getVersion(state);
    const mappedSteps = steps.map(step => ({
      ...step.toJSON(),
      userId: this.userId,
    }));
    this.addSteps(mappedSteps, version, true);
    this.emit('steps:added', { steps: mappedSteps, version });
  }

  processSteps(data: StepData, forceApply?: boolean) {
    if (this.channel.isLeader) {
      logger(`We're leader.. no need to process`);
      this.emit('steps:added', { steps: data.steps, version: this.version });
      return;
    }

    const currentVersion = getVersion(this.getState());
    const expectedVersion = currentVersion + data.steps.length;

    if (data.version === currentVersion) {
      logger(`Received data we already have. Ignoring.`);
    } else if (data.version === expectedVersion) {
      this.processRemoteData(data, forceApply);
    } else if (data.version > expectedVersion) {
      logger(
        `Version too high. Expected ${expectedVersion} but got ${
          data.version
        }. Current local version is ${currentVersion}.`,
      );
      this.queueData(data);
    }
  }

  private queueData(data: StepData) {
    logger(`Queueing data for version ${data.version}.`);
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

  private processRemoteData(data: StepData, forceApply?: boolean) {
    if (this.pauseQueue && !forceApply) {
      logger(`Queue is paused. Aborting.`);
      return;
    }

    const { version, steps } = data;

    logger(`Processing data. Version: ${version}.`);

    if (steps && steps.length) {
      if (!this.channel.isLeader) {
        this.addSteps(steps, version, true);
      }
      this.emit('steps:added', { steps, version });
    }

    this.processQueue();
  }

  private processQueue() {
    if (this.pauseQueue) {
      logger(`Queue is paused. Aborting.`);
      return;
    }

    logger(`Looking for processsable data.`);

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

  private async catchup() {
    this.pauseQueue = true;
    logger(`Too far behind - need to catchup with leader.`);
  }
}
