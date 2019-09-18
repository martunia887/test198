// @flow
/** @jsx jsx */

import React from 'react';
import memoizeOne from 'memoize-one';
import { jsx } from '@emotion/core';

import {
  SELECT_CLEAR_OPTION,
  BaseSelect,
  selectComponents,
} from '../../components/Select';
import { DialogInner } from '../../components/Popup';

import { getOptions } from './utils';

export default class SelectView extends React.PureComponent<*, *> {
  constructor(props: *) {
    super(props);

    const { field, storedValue } = props;

    // NOTE: we must convert the consumer's value to the type that react select
    // expects. This is converted back in the change handler.
    this.state = {
      complexValue: field.toObjectValue(storedValue),
    };

    // NOTE: `getOptions` will "pin" selected options to the top of the list
    // Set options here ONCE when the dialog opens, so they don't jostle
    // about as users select/deselect values.
    this.options = getOptions({
      options: field.options,
      pluck: field.getOptionValue,
      selected: storedValue,
    });
  }

  options: Array<Object>;

  handleChange = (value: *) => {
    const { field, onChange } = this.props;

    if (value && value.includes(SELECT_CLEAR_OPTION)) {
      this.setState({ complexValue: [] });
      onChange([]);
    } else {
      this.setState({ complexValue: value });
      onChange(field.toStringValue(value));
    }
  };

  render() {
    const { components, field, onChange, storedValue, ...props } = this.props;

    return (
      <DialogInner minWidth={220}>
        <BaseSelect
          components={mergeComponents(components)}
          getOptionLabel={field.getOptionLabel}
          getOptionValue={field.getOptionValue}
          onChange={this.handleChange}
          onMenuScrollToBottom={field.onMenuScrollToBottom}
          onMenuScrollToTop={field.onMenuScrollToTop}
          options={this.options}
          placeholder={field.placeholder}
          {...props}
          value={this.state.complexValue}
        />
      </DialogInner>
    );
  }
}

// Components
// ------------------------------

const mergeComponents = memoizeOne(consumerComponents => ({
  ...selectComponents,
  ...consumerComponents,
}));
