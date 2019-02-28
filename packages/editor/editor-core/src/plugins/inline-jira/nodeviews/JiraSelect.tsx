import * as React from 'react';
import styled from 'styled-components';
import Select from '@atlaskit/select';

interface OptionType {
  label: string;
  value: string;
  iconUrl: string;
}
export type Options = Array<OptionType>;

const Option = styled.div`
  display: flex;
  line-height: 1.2;
  img {
    border-radius: 2px;
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
`;

const formatOptionLabel = (option: OptionType, { context }) => (
  <Option>
    <img src={option.iconUrl} /> {option.label}
  </Option>
);

export const JiraSelect = ({ options }: { options: Options }) => (
  <Select
    formatOptionLabel={formatOptionLabel}
    options={options}
    styles={{
      container: css => ({ ...css, width: 105 }),
      // dropdownIndicator: css => ({ ...css, paddingLeft: 0 }),
      menu: css => ({ ...css, width: 300 }),
    }}
  />
);
