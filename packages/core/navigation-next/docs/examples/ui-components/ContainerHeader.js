// @flow

import React from 'react';
import { ContainerHeader, ItemAvatar } from '../../../';
import { CONTENT_NAV_WIDTH } from '../../..//common/constants';

export default () => (
  <div style={{ width: CONTENT_NAV_WIDTH }}>
    <ContainerHeader
      before={s => <ItemAvatar appearance="square" itemState={s} />}
      subText="Container description"
      text="Container name"
    />
  </div>
);
