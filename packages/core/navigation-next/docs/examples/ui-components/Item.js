// @flow

import React from 'react';
import Badge from '@atlaskit/badge';
import CloseButton from '@atlaskit/icon/glyph/cross';
import { Item, ItemAvatar } from '../../../';
import { CONTENT_NAV_WIDTH } from '../../../common/constants';

export default () => (
  <div css={{ width: CONTENT_NAV_WIDTH }}>
    <Item
      after={({ isActive, isHover }) =>
        isActive || isHover ? (
          <CloseButton size="small" />
        ) : (
          <Badge appearance="primary" value={3} />
        )
      }
      before={s => <ItemAvatar itemState={s} presence="online" size="small" />}
      text="Item title"
      subText="Some kind of description"
    />
  </div>
);
