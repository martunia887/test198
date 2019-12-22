import { ExtensionLayout } from '@atlaskit/adf-schema';
import { removeSelectedNode, removeParentNodeOfType } from 'prosemirror-utils';

import { createCommand } from './plugin';
import { ExtensionState } from './types';
import { getSelectedExtension } from './utils';

export const updateState = (state: Partial<ExtensionState>) =>
  createCommand({
    type: 'UPDATE_STATE',
    data: state,
  });

export const updateExtensionLayout = (layout: ExtensionLayout) =>
  createCommand({ type: 'UPDATE_STATE', data: { layout } }, (tr, state) => {
    const selectedExtension = getSelectedExtension(state, true);

    if (selectedExtension) {
      return tr.setNodeMarkup(selectedExtension.pos, undefined, {
        ...selectedExtension.node.attrs,
        layout,
      });
    }

    return tr;
  });

export const removeExtension = () =>
  createCommand(
    {
      type: 'UPDATE_STATE',
      data: { element: undefined, nodeWithPos: undefined },
    },
    (tr, state) => {
      if (getSelectedExtension(state)) {
        return removeSelectedNode(tr);
      } else {
        return removeParentNodeOfType(state.schema.nodes.bodiedExtension)(tr);
      }
    },
  );
