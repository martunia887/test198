import { EditorState, PluginKey } from 'prosemirror-state';
import { TablePluginState } from '../types';

export const pluginKey = new PluginKey('tablePlugin');

export const getPluginState = (state: EditorState): TablePluginState =>
  pluginKey.getState(state);
