import { safeInsert } from 'prosemirror-utils';

import { Command } from '../../../types';
import { InsertedImageProperties, ImageUploadPluginState } from '../types';
import { createExternalMediaNode } from '../utils';

import { startUpload } from './actions';
import { stateKey } from './main';

export const insertExternalImage: (
  options: InsertedImageProperties,
) => Command = options => (state, dispatch) => {
  const pluginState: ImageUploadPluginState = stateKey.getState(state);
  if (!pluginState.enabled || !options.src) {
    return false;
  }

  const mediaNode = createExternalMediaNode(options.src, state.schema);
  if (!mediaNode) {
    return false;
  }

  if (dispatch) {
    dispatch(
      safeInsert(mediaNode, state.selection.$to.pos)(state.tr).scrollIntoView(),
    );
  }
  return true;
};

export const startImageUpload: (event?: Event) => Command = event => (
  state,
  dispatch,
) => {
  const pluginState: ImageUploadPluginState = stateKey.getState(state);
  if (!pluginState.enabled) {
    return false;
  }

  if (dispatch) {
    dispatch(startUpload(event)(state.tr));
  }
  return true;
};
