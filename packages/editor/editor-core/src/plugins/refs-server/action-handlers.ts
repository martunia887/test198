import { RefsServerPluginState } from './pm-plugins/main';
import { ReferenceProvider } from '../refs/provider';

export const handleAddPushRef = (provider: ReferenceProvider) => (
  pluginState: RefsServerPluginState,
) => {
  return pluginState;
};
