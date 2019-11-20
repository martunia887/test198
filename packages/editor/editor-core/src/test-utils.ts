import { EditorPlugin, EditorProps } from './editor';
import { isFullPage as fullPageCheck } from './utils/is-full-page';
import { ScrollGutterPluginOptions } from './plugins/base/pm-plugins/scroll-gutter';

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
  | 'code-block';

async function getPlugin(
  name: Plugins,
  options?: any,
): Promise<EditorPlugin | null> {
  let pluginModule: { default: (pluginOptions: any) => EditorPlugin };
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
    default:
      return null;
  }
  return pluginModule.default(options);
}
async function pushPlugin(
  name: Plugins,
  plugins: EditorPlugin[],
  options?: any,
): Promise<void> {
  const plugin = await getPlugin(name, options);
  if (plugin) {
    plugins.push(plugin);
  }
}

function getScrollGutterOptions(
  props: EditorProps,
): ScrollGutterPluginOptions | undefined {
  const { appearance } = props;
  if (fullPageCheck(appearance)) {
    // Full Page appearance uses a scrollable div wrapper
    return {
      getScrollElement: () =>
        document.querySelector('.fabric-editor-popup-scroll-parent'),
    };
  }
  if (appearance === 'mobile') {
    // Mobile appearance uses body scrolling for improved performance on low powered devices.
    return {
      getScrollElement: () => document.body,
      allowCustomScrollHandler: false,
    };
  }
  return undefined;
}

/**
 * Returns list of plugins that are absolutely necessary for editor to work
 */
async function getDefaultPluginsList(
  props: EditorProps,
): Promise<EditorPlugin[]> {
  const { appearance } = props;
  const isFullPage = fullPageCheck(appearance);

  const editorPlugins = await Promise.all([
    // getPlugin('paste'),
    // getPlugin('base', {
    //   allowInlineCursorTarget: appearance !== 'mobile',
    //   addRunTimePerformanceCheck: isFullPage,
    //   allowScrollGutter: getScrollGutterOptions(props),
    // }),
    // getPlugin('block-type', {
    //   lastNodeMustBeParagraph: appearance === 'comment',
    // }),

    // getPlugin('placeholder', { placeholder }),
    // getPlugin('clear-marks-on-change-to-empty-document'),
    // getPlugin('hyperlink'),
    // getPlugin('text-formatting', textFormatting || {}),
    // getPlugin('width'),
    // getPlugin('type-ahead'),
    // getPlugin('unsupported-content'),
    // getPlugin('editor-disabled'),
    // getPlugin('gap-cursor'),
    // getPlugin('grid', { shouldCalcBreakoutGridLines: isFullPage }),
    // getPlugin('submit-editor'),
    // getPlugin('fake-text-cursor'),
    // getPlugin('floating-toolbar'),
    // getPlugin('shared-context'),
    // getPlugin('code-block'),
  ]);

  return editorPlugins.filter(
    (plugin): plugin is EditorPlugin => plugin != null,
  );
}

export async function asyncCreatePluginList(
  props: EditorProps,
): Promise<EditorPlugin[]> {
  const plugins = await getDefaultPluginsList(props);

  if (props.allowTextAlignment) {
    await pushPlugin('alignment', plugins);
  }

  return plugins;
}

export {
  processPluginsList,
  createSchema,
  createPMPlugins,
} from './create-editor/create-editor';

export { PortalProviderAPI } from './ui/PortalProvider';
export { EventDispatcher } from './event-dispatcher';
