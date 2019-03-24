import {
  inlineExtension,
  extension,
  bodiedExtension,
} from '@atlaskit/adf-schema';
import { EditorPlugin } from '../../types';
import createPlugin from './plugin';
import { getToolbarConfig } from './toolbar';

const extensionPlugin: EditorPlugin = {
  nodes() {
    return [
      { name: 'extension', node: extension },
      { name: 'bodiedExtension', node: bodiedExtension },
      { name: 'inlineExtension', node: inlineExtension },
    ];
  },

  pmPlugins() {
    return [
      {
        name: 'extension',
        plugin: ({ dispatch, providerFactory, portalProviderAPI }) =>
          createPlugin(dispatch, providerFactory, {}, portalProviderAPI),
      },
    ];
  },

  pluginsOptions: {
    floatingToolbar: getToolbarConfig,
  },
};

export default extensionPlugin;
