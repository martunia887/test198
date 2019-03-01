// @flow
/** @jsx jsx */

import { jsx } from '@emotion/core';
import { makeAsyncSelect } from '@atlaskit/select';

import { BaseSelect, selectComponents } from '../../components/Select';
import { DialogInner } from '../../components/Popup';

const AsyncSelect = makeAsyncSelect(BaseSelect);

const AsyncSelectView = ({
  storedValue,
  field,
  isRemovable,
  onRemove,
  loadOptions,
  ...props
}: *) => {
  // NOTE: once at least one option is selected show the value by default
  // it's a bit hacky, but works well. there may be a better solution
  const hasValue = props.value && props.value.length;
  const visibleOptions = hasValue ? props.value : field.defaultOptions;

  return (
    <DialogInner minWidth={220}>
      <AsyncSelect
        components={selectComponents}
        defaultOptions={visibleOptions}
        loadOptions={field.loadOptions}
        {...props}
      />
    </DialogInner>
  );
};

export default AsyncSelectView;
