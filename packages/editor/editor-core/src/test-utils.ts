import { Plugin, TextSelection } from 'prosemirror-state';
import { Schema } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { sortByOrder } from './create-editor/sort-by-order';

export type LightPMPluginFactoryParams = {
  schema: Schema;
  props: {};
  prevProps?: {};
  dispatch: any;
  eventDispatcher: any;
  providerFactory: any;
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

interface LightEditorPlugin {
  name: string;
  pmPlugins?: (pluginOptions?: any) => Array<LightPMPlugin>;
  pluginsOptions?: Record<string, any>;
}

type Plugins =
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

async function getPlugin(
  name: Plugins,
  options?: any,
): Promise<LightEditorPlugin | null> {
  let pluginModule: { default: (pluginOptions: any) => LightEditorPlugin };
  switch (name) {
    case 'alignment': {
      pluginModule = await import('./plugins/alignment');
      break;
    }
    case 'paste': {
      pluginModule = await import('./plugins/paste');
      break;
    }
    case 'base': {
      pluginModule = await import('./plugins/base');
      break;
    }
    case 'block-type': {
      pluginModule = await import('./plugins/block-type');
      break;
    }
    case 'placeholder': {
      pluginModule = await import('./plugins/placeholder');
      break;
    }
    case 'hyperlink': {
      pluginModule = await import('./plugins/hyperlink');
      break;
    }
    case 'text-formatting': {
      pluginModule = await import('./plugins/text-formatting');
      break;
    }
    case 'width': {
      pluginModule = await import('./plugins/width');
      break;
    }
    case 'type-ahead': {
      pluginModule = await import('./plugins/type-ahead');
      break;
    }
    case 'unsupported-content': {
      pluginModule = await import('./plugins/unsupported-content');
      break;
    }
    case 'editor-disabled': {
      pluginModule = await import('./plugins/editor-disabled');
      break;
    }
    case 'gap-cursor': {
      pluginModule = await import('./plugins/gap-cursor');
      break;
    }
    case 'grid': {
      pluginModule = await import('./plugins/grid');
      break;
    }
    case 'submit-editor': {
      pluginModule = await import('./plugins/submit-editor');
      break;
    }
    case 'fake-text-cursor': {
      pluginModule = await import('./plugins/fake-text-cursor');
      break;
    }
    case 'floating-toolbar': {
      pluginModule = await import('./plugins/floating-toolbar');
      break;
    }
    case 'shared-context': {
      pluginModule = await import('./plugins/shared-context');
      break;
    }
    case 'code-block': {
      pluginModule = await import('./plugins/code-block');
      break;
    }
    case 'panel': {
      pluginModule = await import('./plugins/panel');
      break;
    }
    case 'table': {
      pluginModule = await import('./plugins/table');
      break;
    }
    default:
      return null;
  }
  return pluginModule.default(options);
}

export type ArrayConfig = [Plugins, any];
export type PluginConfig = Plugins | ArrayConfig;

async function createEditorPluginList(
  pluginsConfig: PluginConfig[],
): Promise<LightEditorPlugin[]> {
  const plugins: Array<LightEditorPlugin | null> = await Promise.all(
    pluginsConfig.map(config => {
      let pluginName: Plugins;
      let pluginOptions: any = {};

      if (typeof config === 'string') {
        pluginName = config;
      } else {
        [pluginName, pluginOptions] = config;
      }
      return getPlugin(pluginName, pluginOptions);
    }),
  );

  return plugins.filter(
    (maybeAPlugin: any): maybeAPlugin is LightEditorPlugin =>
      maybeAPlugin !== null,
  );
}

function lightProcessPluginsList(
  editorPlugins: LightEditorPlugin[],
): LightPMPlugin[] {
  /**
   * First pass to collect pluginsOptions
   */
  const pluginsOptions = editorPlugins.reduce((acc, plugin) => {
    if (plugin.pluginsOptions) {
      Object.keys(plugin.pluginsOptions).forEach(pluginName => {
        if (!acc[pluginName]) {
          acc[pluginName] = [];
        }
        acc[pluginName].push(plugin.pluginsOptions![pluginName]);
      });
    }

    return acc;
  }, {} as Record<string, any>);

  /**
   * Process plugins
   */
  return editorPlugins.reduce<LightPMPlugin[]>((acc, editorPlugin) => {
    if (editorPlugin.pmPlugins) {
      return [
        ...acc,
        ...editorPlugin.pmPlugins(
          editorPlugin.name ? pluginsOptions[editorPlugin.name] : undefined,
        ),
      ];
    }
    return acc;
  }, []);
}

export async function asyncCreatePMPluginList(
  pluginsConfig: PluginConfig[],
  pluginFactoryParams: LightPMPluginFactoryParams,
): Promise<Plugin[]> {
  const editorPlugins: LightEditorPlugin[] = await createEditorPluginList(
    pluginsConfig,
  );
  const pmPlugins: LightPMPlugin[] = lightProcessPluginsList(editorPlugins);

  return pmPlugins
    .sort(sortByOrder('plugins'))
    .map(({ plugin }) => plugin(pluginFactoryParams))
    .filter(plugin => !!plugin) as Plugin[];
}

export { PortalProviderAPI } from './ui/PortalProvider';
export { EventDispatcher } from './event-dispatcher';
export {
  GapCursorSelection,
  Side as GapCursorSide,
} from './plugins/gap-cursor/selection';

export function setTextSelection(
  view: EditorView,
  anchor: number,
  head?: number,
) {
  const { state } = view;
  const tr = state.tr.setSelection(
    TextSelection.create(state.doc, anchor, head),
  );
  view.dispatch(tr);
}
