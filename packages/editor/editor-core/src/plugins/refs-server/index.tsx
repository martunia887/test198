import { createPlugin } from './pm-plugins/main';
import { EditorPlugin } from '../../types';

const refsServerPlugin: EditorPlugin = {
  pmPlugins() {
    return [
      {
        name: 'refServerPlugin',
        plugin: ({ providerFactory }) => createPlugin(providerFactory),
      },
    ];
  },
};

export default refsServerPlugin;
