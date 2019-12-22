// @flow
/** @jsx jsx */

import { PureComponent } from 'react';
import { makeAsyncSelect } from '@atlaskit/select';
import { jsx } from '@emotion/core';

import { DialogInner } from '../../components/Popup';
import { BaseSelect, selectComponents } from '../../components/Select';

const AsyncSelect = makeAsyncSelect(BaseSelect);

type State = {
  inputValue: string,
};

export default class AsyncSelectView extends PureComponent<*, State> {
  state = { inputValue: '' };

  render() {
    const {
      storedValue,
      field,
      isRemovable,
      onRemove,
      loadOptions,
      ...props
    } = this.props;

    let defaultOptions = props.value;
    if (Array.isArray(field.defaultOptions)) {
      // Show only visible options
      defaultOptions = props.value
        .filter(o => !field.defaultOptions.includes(o))
        .concat([
          {
            label: field.defaultOptionsLabel,
            options: field.defaultOptions,
          },
        ]);
    } else if (typeof field.defaultOptions === 'boolean') {
      defaultOptions = field.defaultOptions; // eslint-disable-line prefer-destructuring
    }

    return (
      <DialogInner minWidth={220}>
        <AsyncSelect
          cacheOptions={field.cacheOptions}
          components={selectComponents}
          defaultOptions={defaultOptions}
          defaultOptionsLabel={field.defaultOptionsLabel}
          inputValue={field.inputValue}
          loadOptions={field.loadOptions}
          onInputChange={field.onInputChange}
          onMenuScrollToBottom={field.onMenuScrollToBottom}
          onMenuScrollToTop={field.onMenuScrollToTop}
          placeholder={field.placeholder}
          {...props}
        />
      </DialogInner>
    );
  }
}
