import { Plugin, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { sortByOrder } from './create-editor/sort-by-order';
import {
  getPlugin,
  LightEditorPlugin,
  LightPMPlugin,
  LightPMPluginFactoryParams,
  Plugins,
} from './create-editor/get-plugins';

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
