import * as React from 'react';
import styled from 'styled-components';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import Select from '@atlaskit/select';

export interface OptionType {
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

export const JiraSelect = ({
  options,
  value,
}: {
  options: Options;
  value?: OptionType;
}) => (
  <Select
    value={value}
    formatOptionLabel={formatOptionLabel}
    options={options}
    styles={{
      container: css => ({ ...css, width: 105 }),
      menu: css => ({ ...css, width: 300 }),
    }}
  />
);

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
}

export default class JiraIssueSelectNodeView extends React.PureComponent<
  Props,
  {}
> {
  render() {
    const { node } = this.props;
    const { name, id, iconUrl, options } = node.attrs.data;

    return (
      <JiraSelect
        options={options}
        value={{
          label: name,
          value: id,
          iconUrl: iconUrl,
        }}
      />
    );
  }
}
