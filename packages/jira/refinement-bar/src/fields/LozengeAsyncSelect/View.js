// @flow
/** @jsx jsx */

import { jsx } from '@emotion/core';
import Lozenge from '@atlaskit/lozenge';
import { gridSize } from '@atlaskit/theme';

import { SELECT_CLEAR_OPTION } from '../../components/Select';

import AsyncSelect from '../AsyncSelect/View';

// do NOT assign directly; a new component must be created to avoid inheritence
const LozengeSelectView = (props: *) => <AsyncSelect {...props} />;

export const formatOptionLabel = (data: *) => (
  <div css={{ alignItems: 'center', display: 'flex' }}>
    {data === SELECT_CLEAR_OPTION ? (
      <div css={{ marginLeft: gridSize() }}>{data.label}</div>
    ) : (
      <Lozenge
        appearance={data.appearance}
        isBold={data.isBold}
        maxWidth={data.maxWidth}
        theme={data.theme}
      >
        {data.label}
      </Lozenge>
    )}
  </div>
);

LozengeSelectView.defaultProps = {
  formatOptionLabel,
};

export default LozengeSelectView;
