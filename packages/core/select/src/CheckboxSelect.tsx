import React from 'react';

import Select from './Select';
import { CheckboxOption } from './components/input-options';
import { SelectProps, OptionType, SelectComponentsConfig } from './types';

const CheckboxSelect = ({ components, ...props }: SelectProps<OptionType>) => {
  const temp: SelectComponentsConfig<OptionType> = {
    ...components,
    Option: CheckboxOption,
  };

  return (
    <Select
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      isMulti
      components={temp}
      {...props}
    />
  );
};

export default CheckboxSelect;
