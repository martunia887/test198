import { PluginKey } from 'prosemirror-state';
import { TablePluginAction, TablePluginState } from '../types';
import { pluginFactoryHelpers } from '../../../utils/plugin-state-factory';

export const pluginKey = new PluginKey('tablePlugin');

export const factoryHelpers = pluginFactoryHelpers<
  TablePluginState,
  TablePluginAction
>(pluginKey);

export const getPluginState = factoryHelpers.getPluginState;

