import { EditorPresetProps, PluginsPreset } from './types';
import { EditorPlugin } from '../../../types';
import { compose } from '../../../utils';

export const removeExcludes = (excludes: EditorPresetProps['excludes']) => (
  plugins: EditorPlugin[],
) => {
  if (excludes) {
    return plugins.filter(plugin => excludes.indexOf(plugin.name) === -1);
  }
  return plugins;
};

export type ExperimentalPluginMap = Map<string, EditorPlugin>;
export const enableExperimental = (
  experimental: EditorPresetProps['experimental'],
  experimentalPluginMap: ExperimentalPluginMap,
) => (plugins: EditorPlugin[]) => {
  if (experimental && experimental.length) {
    experimental.map(pluginName => {
      const plugin = experimentalPluginMap.get(pluginName);
      if (plugin) {
        plugins.push(plugin);
      }
    });
  }
  return plugins;
};

export const processPluginPreset = (preset: PluginsPreset) => {
  const cache = new Map();
  preset.forEach(pluginEntry => {
    if (Array.isArray(pluginEntry)) {
      const [fn, options] = pluginEntry;
      cache.set(fn, options);
    } else {
      /**
       * Prevent usage of same plugin twice without override.
       * [
       *  plugin1,
       *  [plugin1, { option1: value }],
       *  plugin1, // This will throw
       * ]
       */
      if (cache.has(pluginEntry) && cache.get(pluginEntry) === undefined) {
        throw new Error(`${pluginEntry} is already included!`);
      }
      cache.set(pluginEntry, undefined);
    }
  });

  let plugins: Array<EditorPlugin> = [];
  cache.forEach((options, fn) => {
    plugins.push(fn(options));
  });

  return plugins;
};

export const getPluginsFromPreset = (
  preset: PluginsPreset,
  excludes?: EditorPresetProps['excludes'],
  experimental?: EditorPresetProps['experimental'],
): Array<EditorPlugin> => {
  const experimentalMap: ExperimentalPluginMap = new Map();

  return compose(
    enableExperimental(experimental, experimentalMap),
    removeExcludes(excludes),
  )(processPluginPreset(preset));
};
