import { EditorState, PluginKey } from 'prosemirror-state';
import { CardPluginState } from '../types';

export const pluginKey = new PluginKey('cardPlugin');

export const getPluginState = (editorState: EditorState) =>
  pluginKey.getState(editorState) as CardPluginState | undefined;
