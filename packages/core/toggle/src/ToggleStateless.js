// @flow
import React from 'react';
import Base from './ToggleBase';
import { CheckedIcon, UncheckedIcon } from './Icons';
import defaultBaseProps from './defaultBaseProps';
import type { StatelessProps } from './types';

const Toggle = (props: StatelessProps) => (
  <Base {...props}>
    {props.isChecked ? (
      <CheckedIcon size={props.size} label={props.label} />
    ) : (
      <UncheckedIcon size={props.size} label={props.label} />
    )}
  </Base>
);

Toggle.defaultProps = {
  ...defaultBaseProps,
  isChecked: false,
};

export default Toggle;
