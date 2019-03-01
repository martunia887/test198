import * as React from 'react';
import styled from 'styled-components';
import Select from '@atlaskit/select';

export interface OptionType {
  label: string;
  value: string;
  iconUrl: string;
}

interface Props {
  options: Array<OptionType>;
  iconOnly?: boolean;
  isSearchable?: boolean;
  minWidth?: number;
  value?: OptionType;
  onChange?: (value: OptionType) => void;
}

const Option = styled.div`
  display: flex;
  line-height: 1.2;
  img {
    border-radius: 2px;
    width: 16px;
    height: 16px;
  }
`;

const Label = styled.span`
  margin-left: 4px;
`;

const formatOptionLabel = (iconOnly: boolean) => (
  { iconUrl, label }: OptionType,
  { context },
) => (
  <Option>
    <img src={iconUrl} />
    {iconOnly ? (
      context === 'menu' ? (
        <Label>{label}</Label>
      ) : (
        ''
      )
    ) : (
      <Label>{label}</Label>
    )}
  </Option>
);

export const JiraSelect = ({
  options,
  iconOnly = false,
  isSearchable = false,
  minWidth = 120,
  value,
  onChange,
}: Props) => (
  <Select
    spacing="compact"
    formatOptionLabel={formatOptionLabel(iconOnly)}
    options={options}
    onChange={onChange}
    isSearchable={isSearchable}
    value={value}
    styles={{
      container: css => ({ ...css, minWidth }),
      control: css => ({
        ...css,
        background: 'transparent',
        border: 0,
      }),
      menu: css => ({ ...css, width: 300 }),
    }}
  />
);
