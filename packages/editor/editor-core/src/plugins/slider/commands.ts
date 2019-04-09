import { SliderAttributes } from '@atlaskit/adf-schema';
import { Command } from '../../types';

export const removeSlider = (pos: number): Command => (state, dispatch) => {
  if (dispatch) {
    dispatch(state.tr.delete(pos, pos + 1));
  }
  return true;
};

export const updateAttributes = (
  attrs: SliderAttributes,
  pos: number,
): Command => (state, dispatch) => {
  if (dispatch) {
    const node = state.doc.nodeAt(pos);
    if (node) {
      console.log({ node });
      dispatch(
        state.tr.replaceWith(
          pos,
          pos + node.nodeSize,
          state.schema.nodes.slider.createChecked({
            ...node.attrs,
            ...attrs,
          }),
        ),
      );
      return true;
    }
  }
  return false;
};
