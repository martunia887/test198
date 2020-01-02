import { MarkSpec, NodeSpec, Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { sanitizeNodes } from '@atlaskit/adf-schema';
import { ErrorReporter, ErrorReportingHandler } from '@atlaskit/editor-common';
import { AnalyticsHandler, analyticsService } from '../analytics';
import {
  EditorPlugin,
  EditorConfig,
  PluginsOptions,
  PMPluginCreateConfig,
} from '../types';
import { name, version } from '../version-wrapper';
import { sortByOrder } from './sort-by-order';

export function sortByRank(a: { rank: number }, b: { rank: number }): number {
  return a.rank - b.rank;
}

export function fixExcludes(marks: {
  [key: string]: MarkSpec;
}): { [key: string]: MarkSpec } {
  const markKeys = Object.keys(marks);
  const markGroups = new Set(markKeys.map(mark => marks[mark].group));

  markKeys.forEach(markKey => {
    const mark = marks[markKey];
    if (mark.excludes) {
      mark.excludes = mark.excludes
        .split(' ')
        .filter(group => markGroups.has(group))
        .join(' ');
    }
  });
  return marks;
}

export function processPluginsList(plugins: EditorPlugin[]): EditorConfig {
  /**
   * First pass to collect pluginsOptions
   */
  const pluginsOptions = plugins.reduce((acc, plugin) => {
    if (plugin.pluginsOptions) {
      Object.keys(plugin.pluginsOptions).forEach(pluginName => {
        if (!acc[pluginName]) {
          acc[pluginName] = [];
        }
        acc[pluginName].push(plugin.pluginsOptions![pluginName]);
      });
    }

    return acc;
  }, {} as PluginsOptions);

  /**
   * Process plugins
   */
  return plugins.reduce(
    (acc, plugin) => {
      if (plugin.pmPlugins) {
        acc.pmPlugins.push(
          ...plugin.pmPlugins(
            plugin.name ? pluginsOptions[plugin.name] : undefined,
          ),
        );
      }

      if (plugin.nodes) {
        acc.nodes.push(...plugin.nodes());
      }

      if (plugin.marks) {
        acc.marks.push(...plugin.marks());
      }

      if (plugin.contentComponent) {
        acc.contentComponents.push(plugin.contentComponent);
      }

      if (plugin.primaryToolbarComponent) {
        acc.primaryToolbarComponents.push(plugin.primaryToolbarComponent);
      }

      if (plugin.secondaryToolbarComponent) {
        acc.secondaryToolbarComponents.push(plugin.secondaryToolbarComponent);
      }

      return acc;
    },
    {
      nodes: [],
      marks: [],
      pmPlugins: [],
      contentComponents: [],
      primaryToolbarComponents: [],
      secondaryToolbarComponents: [],
    } as EditorConfig,
  );
}

export function createSchema(editorConfig: EditorConfig) {
  const marks = fixExcludes(
    editorConfig.marks.sort(sortByOrder('marks')).reduce((acc, mark) => {
      acc[mark.name] = mark.mark;
      return acc;
    }, {} as { [nodeName: string]: MarkSpec }),
  );
  const nodes = sanitizeNodes(
    editorConfig.nodes.sort(sortByOrder('nodes')).reduce((acc, node) => {
      acc[node.name] = node.node;
      return acc;
    }, {} as { [nodeName: string]: NodeSpec }),
    marks,
  );

  return new Schema({ nodes, marks });
}

export function createPMPlugins({
  editorConfig,
  schema,
  dispatch,
  eventDispatcher,
  providerFactory,
  errorReporter,
  portalProviderAPI,
  reactContext,
  dispatchAnalyticsEvent,
}: PMPluginCreateConfig): Plugin[] {
  return editorConfig.pmPlugins
    .sort(sortByOrder('plugins'))
    .map(({ plugin }) =>
      plugin({
        schema,
        dispatch,
        providerFactory,
        errorReporter,
        eventDispatcher,
        portalProviderAPI,
        reactContext,
        dispatchAnalyticsEvent,
      }),
    )
    .filter(plugin => !!plugin) as Plugin[];
}

export function createErrorReporter(
  errorReporterHandler?: ErrorReportingHandler,
) {
  const errorReporter = new ErrorReporter();
  if (errorReporterHandler) {
    errorReporter.handler = errorReporterHandler;
  }
  return errorReporter;
}

export function initAnalytics(analyticsHandler?: AnalyticsHandler) {
  analyticsService.handler = analyticsHandler || (() => {});
  analyticsService.trackEvent('atlassian.editor.start', {
    name,
    version,
  });
}
