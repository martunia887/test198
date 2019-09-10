import React from 'react';
import { Checkbox, IconProps } from '../src';
import IconIndeterminate from '@atlaskit/icon/glyph/add-circle';
import Icon from '@atlaskit/icon/glyph/check-circle';

export default () => (
  <form id="lovely-form" onSubmit={e => console.log(e)}>
    <Checkbox
      label="That's not a standard Icon!"
      overrides={{
        IconWrapper: {
          attributesFn: () => ({ form: 'lovely-form' }),
        },
      }}
    />
  </form>
);
