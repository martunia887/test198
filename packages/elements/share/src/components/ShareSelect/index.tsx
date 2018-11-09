import React, { Component } from 'react';
import { Field } from '@atlaskit/form';
import { AsyncCreatableSelect } from '@atlaskit/select';

export interface Recipient {
  id?: string;
  email?: string;
}

export interface Option extends Recipient {
  label: string;
  value: string;
}

export interface LoadOptions {
  (query: any): any;
}

export interface OnChange {
  (recipients: Array<{}>): any;
}

export interface Props {
  loadOptions: LoadOptions;
  handleChange: OnChange;
}

// This should go into the Provider
export const isValidNewOption = optionValue => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return typeof optionValue === 'string' && emailRegex.test(optionValue);
};

export const getNewOptionData = optionValue => ({
  title: optionValue,
  email: optionValue,
  __isNew__: true,
});
export const getOptionLabel = opt => opt.title;
export const getOptionValue = opt => opt.title;
export const controlLabel = ({ title }) => <div>{title}</div>;
export const optionLabel = ({ title, username }) => (
  <div>
    <div>{title}</div>
    <div>{username}</div>
  </div>
);

const getLabel = (opt, { context }) =>
  context === 'value' ? controlLabel(opt) : optionLabel(opt);

export default class ShareSelect extends Component<Props, {}> {
  render() {
    const { handleChange, loadOptions } = this.props;

    return (
      <Field label="Send a notification">
        <AsyncCreatableSelect
          allowCreateWhileLoading={false}
          getNewOptionData={getNewOptionData}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          isMulti
          isValidNewOption={isValidNewOption}
          loadOptions={loadOptions}
          menuPosition="fixed"
          onChange={handleChange}
          formatOptionLabel={getLabel}
          placeholder="Add a name, email or group"
        />
      </Field>
    );
  }
}
