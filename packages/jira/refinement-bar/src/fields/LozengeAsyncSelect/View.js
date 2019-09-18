// @flow
/** @jsx jsx */

import { jsx } from '@emotion/core';
import Lozenge from '@atlaskit/lozenge';
import { gridSize } from '@atlaskit/theme';
import AsyncSelect from '../AsyncSelect/View';
import { SELECT_CLEAR_OPTION } from '../Select/View';

// do NOT assign directly; a new component must be created to avoid inheritence
const LozengeSelectView = (props: *) => <AsyncSelect {...props} />;

export const formatOptionLabel = (data: *) => (
  <div css={{ alignItems: 'center', display: 'flex' }}>
    <div css={{ marginLeft: gridSize() }}>
      {data === SELECT_CLEAR_OPTION ? null : (
        <div css={{ display: 'flex' }}>
          <Lozenge
            appearance={data.appearance}
            isBold={data.isBold}
            maxWidth={data.maxWidth}
            theme={data.theme}
          >
            {data.label}
          </Lozenge>
        </div>
      )}
    </div>
  </div>
);

LozengeSelectView.defaultProps = {
  formatOptionLabel,
};

export default LozengeSelectView;
