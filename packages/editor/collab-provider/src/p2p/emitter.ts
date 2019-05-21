import { EventEmitter2 } from 'eventemitter2';

export class Emitter<T = any> {
  private eventEmitter: EventEmitter2 = new EventEmitter2();

  /**
   * Emit events to subscribers
   */
  protected emit(evt: T, data: any) {
    this.eventEmitter.emit(evt as any, data);
    return this;
  }

  /**
   * Subscribe to events emitted by this provider
   */
  on(evt: T, handler: (...args: any) => void) {
    this.eventEmitter.on(evt as any, handler);
    return this;
  }

  /**
   * Unsubscribe from events emitted by this provider
   */
  off(evt: T, handler: (...args: any) => void) {
    this.eventEmitter.off(evt as any, handler);
    return this;
  }

  /**
   * Unsubscribe from all events emitted by this provider.
   */
  unsubscribeAll(evt?: T) {
    this.eventEmitter.removeAllListeners(evt as any);
    return this;
  }
}
