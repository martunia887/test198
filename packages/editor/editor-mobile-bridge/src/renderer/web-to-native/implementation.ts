import { sendToBridge } from '../../bridge-utils';
import { RendererBridges, RendererPluginBridges } from './bridge';

class WebRendererBridge {
  call<T extends RendererPluginBridges>(
    bridge: T,
    event: keyof Exclude<RendererBridges[T], undefined>,
    ...args: any[]
  ) {
    sendToBridge(bridge, event, ...args);
  }
}

export const toNativeBridge = new WebRendererBridge();
