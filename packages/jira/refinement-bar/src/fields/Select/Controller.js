// @flow

import React, { type Node } from 'react';
import FieldController from '../Controller';
import { isObject } from '../../utils';

export interface SelectControllerInterface {
  config: Object;
  getFilterLabel: (*) => any;
  hasValue: (*) => boolean;
  getInitialValue: (*) => any;
  formatFilter: (*) => Node;
  validateOptions: (*) => Object;
  validateValue: (*) => boolean;
}

export default class SelectController extends FieldController {
  constructor(...args: *) {
    super(...args);
    this.options = this.config.options;
  }
  options: Array<Object>;
  getFilterLabel = () => {
    return this.label;
  };
  hasValue = ({ value }: *) => {
    return Array.isArray(value) ? value.length > 0 : isObject(value);
  };
  getInitialValue = () => null;
  formatFilter = ({ value }: *) => {
    const separator = ', ';
    const max = 3;
    const makeLabel = suffix => (
      <span>
        <strong>{this.label}:</strong> {suffix}
      </span>
    );

    // no value
    if (!this.hasValue({ value })) return this.label;

    // value is object
    if (!Array.isArray(value)) return makeLabel(value.label);

    // value is array
    // create comma separated list of values
    // maximum 3 visible
    const valueMap = value.map(v => v.label);
    const valueLength = valueMap.length;

    return makeLabel(
      valueLength > max
        ? `${valueMap.slice(0, max).join(separator)} +${valueLength - 3} more`
        : valueMap.join(separator),
    );
  };

  // Implementation

  validateOptions = (options: *) => {
    let message = null;
    let validity = true;

    if (!Array.isArray(options)) {
      validity = false;
      message = 'Options must be an array.';
    }
    if (options.length > 0 && isObject(options[0])) {
      validity = false;
      message = 'Options array must contain objects.';
    }

    return { message, validity };
  };
}
