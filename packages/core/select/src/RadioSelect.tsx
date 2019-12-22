import React from 'react';

import Select from './Select';
import { RadioOption } from './components/input-options';
import { SelectProps, OptionType } from './types';

const RadioSelect = ({ components, ...props }: SelectProps<OptionType>) => (
  <Select
    {...props}
    isMulti={false}
    components={{ ...components, Option: RadioOption }}
  />
);

export default RadioSelect;
