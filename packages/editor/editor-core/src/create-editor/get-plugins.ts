import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { EventDispatcher, Dispatch } from '../event-dispatcher';

export type LightPMPluginFactoryParams = {
  // We can type this safe, we already remove the real code from this types
  schema: Schema;
  dispatch: Dispatch;
  eventDispatcher: EventDispatcher;
  providerFactory: ProviderFactory;
  // We dont use this for now
  props: {};
  prevProps?: {};
  portalProviderAPI: any;
  reactContext: () => { [key: string]: any };
  dispatchAnalyticsEvent: any;
};
export type LightPMPluginFactory = (
  params: LightPMPluginFactoryParams,
) => Plugin | undefined;
export type LightPMPlugin = {
  name: string;
  plugin: LightPMPluginFactory;
};

export interface LightEditorPlugin {
  name: string;
  pmPlugins?: (pluginOptions?: any) => Array<LightPMPlugin>;
  pluginsOptions?: Record<string, any>;
}

export type Plugins =
  | 'alignment'
  | 'paste'
  | 'base'
  | 'block-type'
  | 'placeholder'
  | 'clear-marks-on-change-to-empty-document'
  | 'hyperlink'
  | 'text-formatting'
  | 'width'
  | 'type-ahead'
  | 'unsupported-content'
  | 'editor-disabled'
  | 'gap-cursor'
  | 'grid'
  | 'submit-editor'
  | 'fake-text-cursor'
  | 'floating-toolbar'
  | 'shared-context'
  | 'code-block'
  | 'panel'
  | 'table';

export async function getPlugin(
  name: Plugins,
  options?: any,
): Promise<LightEditorPlugin | null> {
  let pluginModule: { default: (pluginOptions: any) => LightEditorPlugin };
  switch (name) {
    case 'alignment': {
      pluginModule = await import('../plugins/alignment');
      break;
    }
    case 'paste': {
      pluginModule = await import('../plugins/paste');
      break;
    }
    case 'base': {
      pluginModule = await import('../plugins/base');
      break;
    }
    case 'block-type': {
      pluginModule = await import('../plugins/block-type');
      break;
    }
    case 'placeholder': {
      pluginModule = await import('../plugins/placeholder');
      break;
    }
    case 'hyperlink': {
      pluginModule = await import('../plugins/hyperlink');
      break;
    }
    case 'text-formatting': {
      pluginModule = await import('../plugins/text-formatting');
      break;
    }
    case 'width': {
      pluginModule = await import('../plugins/width');
      break;
    }
    case 'type-ahead': {
      pluginModule = await import('../plugins/type-ahead');
      break;
    }
    case 'unsupported-content': {
      pluginModule = await import('../plugins/unsupported-content');
      break;
    }
    case 'editor-disabled': {
      pluginModule = await import('../plugins/editor-disabled');
      break;
    }
    case 'gap-cursor': {
      pluginModule = await import('../plugins/gap-cursor');
      break;
    }
    case 'grid': {
      pluginModule = await import('../plugins/grid');
      break;
    }
    case 'submit-editor': {
      pluginModule = await import('../plugins/submit-editor');
      break;
    }
    case 'fake-text-cursor': {
      pluginModule = await import('../plugins/fake-text-cursor');
      break;
    }
    case 'floating-toolbar': {
      pluginModule = await import('../plugins/floating-toolbar');
      break;
    }
    case 'shared-context': {
      pluginModule = await import('../plugins/shared-context');
      break;
    }
    case 'code-block': {
      pluginModule = await import('../plugins/code-block');
      break;
    }
    case 'panel': {
      pluginModule = await import('../plugins/panel');
      break;
    }
    case 'table': {
      pluginModule = await import('../plugins/table');
      break;
    }
    // TODO: ADD ALL THE PLUGINS
    default:
      return null;
  }
  return pluginModule.default(options);
}
