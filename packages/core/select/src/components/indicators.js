// @flow
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { components } from 'react-select';
import Spinner from '@atlaskit/spinner';
import SelectClearIcon from '@atlaskit/icon/glyph/select-clear';
import DownIcon from '@atlaskit/icon/glyph/hipchat/chevron-down';

// indicators
export const ClearIndicator = (props: any) => (
  <components.ClearIndicator {...props}>
    <SelectClearIcon size="small" primaryColor="inherit" />
  </components.ClearIndicator>
);
export const DropdownIndicator = (props: any) => (
  <components.DropdownIndicator {...props}>
    <DownIcon />
  </components.DropdownIndicator>
);

export const LoadingIndicator = (props: any) => (
  <div css={props.getStyles('loadingIndicator', props)} {...props.innerProps}>
    <Spinner size="small" />
  </div>
);
