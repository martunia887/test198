import { createCommand, pluginKey } from './pm-plugins/main';
import { Command } from '../../types';
import { Slice, Fragment } from 'prosemirror-model';

export const toggleModal = (): Command =>
  createCommand(
    {
      type: 'TOGGLE_MODAL',
    },
    tr => tr.setMeta('addToHistory', false),
  );

export const createLocation = (geo: any): Command => {
  return (state, dispatch) => {
    debugger;
    const locNode = state.schema.nodes.inlineLocation.createChecked({
      address: geo.address,
      coords: {
        lat: geo.coords.lat,
        lng: geo.coords.lng,
      },
    });

    if (dispatch) {
      dispatch(
        state.tr
          .insert(state.selection.from, locNode)
          .setMeta(pluginKey, { type: 'TOGGLE_MODAL' }),
      );
    }
    return true;
  };
};
