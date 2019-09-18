// @flow

import React from 'react';

import FieldController from '../Controller';

import { flattenByKey } from './utils';

type Options = Array<Object>;

const defaultGetOptionLabel = opt => opt.label;
const defaultGetOptionValue = opt => opt.value;

export default class SelectController extends FieldController {
  constructor(...args: *) {
    super(...args);

    this.getOptionLabel = this.config.getOptionLabel || defaultGetOptionLabel;
    this.getOptionValue = this.config.getOptionValue || defaultGetOptionValue;
    this.onMenuScrollToBottom = this.config.onMenuScrollToBottom;
    this.onMenuScrollToTop = this.config.onMenuScrollToTop;
    this.options = this.config.options || [];
    this.placeholder = this.config.placeholder;
  }

  getOptionValue: ?Function;

  options: Options;

  onMenuScrollToBottom: ?Function;

  onMenuScrollToTop: ?Function;

  placeholder: ?string;

  // used by async variant
  setOptions = (options: *) => {
    this.options = options;
  };

  hasValue = (value: *) => {
    return Array.isArray(value) && value.length > 0;
  };

  getInitialValue = () => {
    return [];
  };

  /*
    In: ['one', 'two']
    Out: [{ label: 'One', value: 'one' }, { label: 'Two', value: 'two' }]
  */
  toObjectValue = value => {
    if (value === undefined) {
      return undefined;
    }
    if (!value.length) {
      return value;
    }

    const flattenedOptions = flattenByKey(this.options, 'options');
    const hasValue = opt => value.includes(this.getOptionValue(opt));

    return flattenedOptions.filter(hasValue);
  };

  /*
    In: [{ label: 'One', value: 'one' }, { label: 'Two', value: 'two' }]
    Out: ['one', 'two']
  */
  toStringValue = value => {
    if (value === undefined) {
      return undefined;
    }
    if (!value.length) {
      return value;
    }

    return value.map(opt => this.getOptionValue(opt));
  };

  formatLabel = (stringValue: Array<Object>) => {
    // no value, just display the label
    if (!this.hasValue(stringValue)) return this.label;

    // build complex options
    const value = this.toObjectValue(stringValue);
    const separator = ', ';
    const max = 3;

    // create a comma separated list of values
    const valueLabels = value.map(this.getOptionLabel);
    const valueLen = value.length;
    const labelGroup =
      valueLen > max
        ? `${valueLabels.slice(0, max).join(separator)} +${valueLen - max} more`
        : valueLabels.join(separator);

    return (
      <span>
        <strong>{this.label}:</strong> {labelGroup}
      </span>
    );
  };
}
