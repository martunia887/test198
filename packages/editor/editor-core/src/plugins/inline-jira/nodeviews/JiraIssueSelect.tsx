import * as React from 'react';
import styled from 'styled-components';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import Select from '@atlaskit/select';
import { Status, Color } from '@atlaskit/status';

export interface OptionType {
  label: string;
  value: string;
  iconUrl: string;
  colorName?: Color;
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

const formatOptionLabel = (option: OptionType, { context }) => {
  if (option.colorName) {
    return <Status text={option.label} color={option.colorName} />;
  }

  if (option.iconUrl) {
    return (
      <Option>
        <img src={option.iconUrl} /> {option.label}
      </Option>
    );
  }

  return null;
};

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
      menu: css => ({ ...css, width: 105 }),
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
    if (!node.attrs.data) {
      return null;
    }
    const { name, id, iconUrl, colorName, options } = node.attrs.data;

    return (
      <JiraSelect
        options={options}
        value={{
          label: name,
          value: id,
          iconUrl,
          colorName,
        }}
      />
    );
  }
}
