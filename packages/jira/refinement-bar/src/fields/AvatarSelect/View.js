// @flow
/** @jsx jsx */

import { jsx } from '@emotion/core';
import Avatar from '@atlaskit/avatar';
import { gridSize } from '@atlaskit/theme';

import { SELECT_CLEAR_OPTION } from '../../components/Select';

import Select from '../Select/View';

// do NOT assign directly; a new component must be created to avoid inheritence
const AvatarSelectView = (props: *) => <Select {...props} />;

export const formatOptionLabel = (data: *) => (
  <div css={{ alignItems: 'center', display: 'flex' }}>
    {data === SELECT_CLEAR_OPTION ? null : (
      <Avatar src={data.avatar} size="xsmall" />
    )}
    <div css={{ marginLeft: gridSize() }}>{data.label}</div>
  </div>
);

AvatarSelectView.defaultProps = {
  formatOptionLabel,
};
AvatarSelectView.displayName = 'AvatarSelectView';

export default AvatarSelectView;
