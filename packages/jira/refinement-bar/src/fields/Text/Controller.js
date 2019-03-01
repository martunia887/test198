// @flow

import React from 'react';
import FieldController from '../Controller';

export default class TextController extends FieldController {
  formatButtonLabel = ({ type, value }: *) => {
    const exact = type === 'is';
    const notset = type === 'is_not_set';

    // $FlowFixMe
    const typeLabel = this.getFilterTypes().find(f => f.type === type).label;
    const showType = exact || notset || this.hasValue({ value });
    const showValue = exact || this.hasValue({ value });

    if (!showType && !showValue) {
      return this.label;
    }

    return (
      <span>
        <strong>{this.label}:</strong>
        {showType ? ` ${typeLabel}` : null}
        {showValue ? ` "${value}"` : null}
      </span>
    );
  };

  getInitialValue = () => ({
    type: 'contains',
    value: '',
  });
  getFilterTypes = () => [
    {
      type: 'contains',
      label: 'contains',
      hasInput: true,
    },
    {
      type: 'not_contains',
      label: 'does not contain',
      hasInput: true,
    },
    {
      type: 'is',
      label: 'exactly matches',
      hasInput: true,
    },
    { type: 'is_not_set', label: 'is empty' },
  ];

  // Implementation

  validateValue = ({ value }: *) => {
    const INVALID_FIRST_CHARS = ['*', '?'];
    let message = null;
    let isInvalid = false;

    if (value === null) {
      return { message, isInvalid };
    }

    if (INVALID_FIRST_CHARS.includes(value.charAt(0))) {
      message =
        "The '*' and '?' are not allowed as first character in a 'wildard' search.";
      isInvalid = true;
    }

    return { message, isInvalid };
  };
}
