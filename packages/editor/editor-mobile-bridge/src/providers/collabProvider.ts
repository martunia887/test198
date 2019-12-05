import { P2PCollabProvider, Socket } from '@atlaskit/collab-provider';
import { EventEmitter2 } from 'eventemitter2';
import { toNativeBridge } from '../editor/web-to-native';
import WebBridgeImpl, { EventReceiver } from '../editor/native-to-web';

class BridgedSocket implements Socket, EventReceiver {
  private socketId: string = 'todo!';
  private readonly emitter = new EventEmitter2();
  private readonly bridge: WebBridgeImpl;

  constructor(path: string, bridge: WebBridgeImpl) {
    this.bridge = bridge;
    bridge.socket = this;
    toNativeBridge.connect(path);
  }

  get id() {
    return this.socketId;
  }

  on(event: string | string[], listener: (...values: any[]) => void) {
    console.log(`Registering listener for '${event}'`);
    return this.emitter.on(event, listener);
  }

  disconnect(): void {
    console.log(`Disconnecting socket '${this.id}'`);
    this.bridge.socket = null;
    toNativeBridge.disconnect();
  }

  emit(event: string, ...args: any[]): void {
    console.log(`Emitting event '${event}'`);
    const payload = JSON.stringify(args || []);
    toNativeBridge.emit(event, payload);
  }

  received(event: string, payload: string) {
    console.log(`Received event through bridge '${event}'`);
    if (event === 'connect') {
      this.socketId = payload;
      console.log(`Connected SID '${this.socketId}'`);
      this.emitter.emit(event, payload);
    } else {
      const arg = JSON.parse(payload);
      console.log(`Emitting processed event ${event}`, arg);
      this.emitter.emit(event, arg);
    }
  }
}

async function createCollabProvider(
  bridge: WebBridgeImpl,
): Promise<P2PCollabProvider> {
  return new P2PCollabProvider({
    documentAri: 'ari:cloud:demo::document/mobile',
    url: 'https://pf-collab-spike-service.ap-southeast-2.dev.atl-paas.net',
    socket: path => new BridgedSocket(path, bridge),
  });
}

export default createCollabProvider;
