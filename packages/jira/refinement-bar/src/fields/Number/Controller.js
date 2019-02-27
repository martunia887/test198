// @flow

import React from 'react';
import FieldController from '../Controller';
import { isObject, objectMap } from '../../utils';

const validateInput = (label, value, name) => {
  let message = null;
  let isInvalid = false;
  const prefix = name ? `${label} "${name}"` : label;

  if (Number.isNaN(value)) {
    message = `${prefix} must be a number`;
    isInvalid = true;
  } else if (!Number.isInteger(value)) {
    message = `${prefix} must be a whole number`;
    isInvalid = true;
  } else if (value < 0) {
    message = `${prefix} must be a positive number`;
    isInvalid = true;
  }

  return { message, isInvalid };
};

export default class NumberController extends FieldController {
  getFilterGraphQL = ({ type, value }: *) => {
    // special case where the value is a tuple
    if (type === 'between') {
      return `AND: [{
        ${this.key}_gt: ${value[0]} },
        { ${this.key}_lt: ${value[1]} }]
      }`;
    }

    const key = type === 'is' ? this.key : `${this.key}_${type}`;

    return `${key}: ${value}`;
  };
  getFilterLabel = () => {
    return this.label;
  };
  formatFilter = ({ type, value }: *) => {
    // $FlowFixMe
    const typeLabel = this.getFilterTypes().find(f => f.type === type).label;
    const showValue = type !== 'is_not_set';
    const valueLabel = isObject(value)
      ? Object.values(value).join(' and ')
      : value;

    if (!this.hasValue({ value })) {
      return this.label;
    }

    return (
      <span>
        <strong>{this.label}:</strong> {typeLabel}
        {showValue ? ` ${valueLabel}` : null}
      </span>
    );
  };

  getInitialValue = () => ({
    type: 'is',
    value: '',
  });
  getFilterTypes = () => [
    { type: 'is', label: 'is', hasInput: true },
    {
      type: 'not',
      label: 'is not',
      hasInput: true,
    },
    {
      type: 'gt',
      label: 'greater than',
      hasInput: true,
    },
    {
      type: 'lt',
      label: 'less than',
      hasInput: true,
    },
    {
      type: `between`,
      label: 'between',
      hasInput: true,
    },
    { type: 'is_not_set', label: 'has no value' },
  ];

  // Implementation

  validateValue = ({ value }: *) => {
    let result = { message: null, isInvalid: false };
    const nameMap = { lt: 'to', gt: 'from' };

    if (isObject(value)) {
      // avoid invalidating the field before the second field has input
      if (value.lt && value.gt) {
        if (value.lt <= value.gt) {
          return {
            message:
              'Invalid range; the second input must be greater than the first.',
            isInvalid: true,
          };
        }

        objectMap(value, (val, key) => {
          const r = validateInput(this.label, val, nameMap[key]);
          if (r.isInvalid) result = r;
          return null;
        });
      }
    } else {
      result = validateInput(this.label, value);
    }

    return result;
  };
}
