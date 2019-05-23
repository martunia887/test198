import React from 'react';
import { components } from 'react-select';
import Spinner from '@atlaskit/spinner';
import SelectClearIcon from '@atlaskit/icon/glyph/select-clear';
import DownIcon from '@atlaskit/icon/glyph/hipchat/chevron-down';
import { IndicatorComponentType } from 'react-select/lib/components';
import { IndicatorProps } from 'react-select/lib/components/indicators';

// indicators
export const ClearIndicator = (props: IndicatorProps<any>) => {
  const ClearIndicatorComponent = components.ClearIndicator as IndicatorComponentType<
    any
  >;

  return (
    <ClearIndicatorComponent {...props}>
      <SelectClearIcon size="small" primaryColor="inherit" />
    </ClearIndicatorComponent>
  );
};
export const DropdownIndicator = (props: IndicatorProps<any>) => {
  const DropdownIndicatorComponent = components.DropdownIndicator as IndicatorComponentType<
    any
  >;

  return (
    <DropdownIndicatorComponent {...props}>
      <DownIcon label="down" />
    </DropdownIndicatorComponent>
  );
};

export const LoadingIndicator = (props: any) => (
  <div style={props.getStyles('loadingIndicator', props)} {...props.innerProps}>
    <Spinner size="small" />
  </div>
);
