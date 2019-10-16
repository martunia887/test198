import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';

import commonMessages from '../../messages';
import { FloatingToolbarHandler } from '../floating-toolbar/types';
import { deleteExpand } from './commands';
import { getPluginState } from './pm-plugins/main';
import { hoverDecoration } from '../base/pm-plugins/decoration';

export const getToolbarConfig: FloatingToolbarHandler = (
  state,
  { formatMessage },
) => {
  const { expandRef } = getPluginState(state);
  if (expandRef) {
    const { expand, nestedExpand } = state.schema.nodes;
    return {
      title: 'Expand toolbar',
      getDomRef: () => expandRef,
      nodeType: [expand, nestedExpand],
      offset: [0, 3],
      items: [
        {
          type: 'button',
          appearance: 'danger',
          icon: RemoveIcon,
          onClick: deleteExpand(),
          onMouseEnter: hoverDecoration([expand, nestedExpand], true),
          onMouseLeave: hoverDecoration([expand, nestedExpand], false),
          title: formatMessage(commonMessages.remove),
        },
      ],
    };
  }
  return;
};
