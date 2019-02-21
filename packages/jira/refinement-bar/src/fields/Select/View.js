// @flow
/** @jsx jsx */

import { jsx } from '@emotion/core';
import { CheckboxOption, PopupSelect } from '@atlaskit/select';
import { colors } from '@atlaskit/theme';

import { FilterButton } from '../../components/FilterButton';

// TODO: there's probably a better way to do this, but it's late, and i'm tired.
export const CLEAR_VALUE = '__clear-selected';

const ClearOption = ({ children, innerProps, isFocused }: *) => (
  <div
    css={{
      boxSizing: 'border-box',
      color: colors.primary(),
      cursor: 'pointer',
      fontSize: 'inherit',
      padding: '8px 12px',
      userSelect: 'none',
      textDecoration: isFocused ? 'underline' : null,
      webkitTapHighlightColor: 'rgba(0,0,0,0)',
      width: '100%',

      '&:hover': {
        textDecoration: 'underline',
      },
    }}
    {...innerProps}
  >
    {children}
  </div>
);

// NOTE: fork the option renderer based on a "clear marker", which needs to look
// and behave in a different way

const Option = (props: *) =>
  props.data.value === CLEAR_VALUE ? (
    <ClearOption {...props} />
  ) : (
    <CheckboxOption {...props} />
  );

const lcase = str => str.toLowerCase();

// NOTE: determine which options should be visible to the user
// - reimplements react-select's input matching
// - checks (and hides) if the option already exists "above the fold"
const filterOptions = currentValue => ({ data, value }, input) => {
  const match = lcase(data.value).includes(lcase(input));
  const notCurrentlySelected =
    !currentValue || !currentValue.some(o => o.value === value);

  if (input) {
    return match && !data.aboveTheFold;
  }

  return notCurrentlySelected || data.aboveTheFold;
};

// NOTE: prepends the options array with all the currently selected options
// - selected options are marked with an `aboveTheFold` data key
// - also adds a special "clear" option
const getOptions = (current, resolved) => {
  if (!current || !current.length) return resolved;

  return current
    .map(o => ({ ...o, aboveTheFold: true }))
    .concat([{ value: CLEAR_VALUE, label: 'Clear selected items' }])
    .concat(resolved);
};

const SelectView = ({
  currentValue,
  currentValues,
  applyChanges,
  field,
  isRemovable,
  onRemove,
  ...props
}: *) => {
  if (!field.options) {
    throw new Error('Select type requires options.');
  }
  if (!field.label) {
    throw new Error('Select type requires a label.');
  }

  // NOTE: supports options array to be the result of a function.
  // - pass the "current values" to the function
  let resolvedOptions = field.options;
  if (typeof field.options === 'function') {
    resolvedOptions = field.options(currentValues);
  }

  // build this monstrosity of options
  const augmentedOptions = getOptions(currentValue, resolvedOptions);

  return (
    <PopupSelect
      components={{ IndicatorSeparator: null, Option }}
      isMulti
      onMenuClose={applyChanges}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      filterOption={filterOptions(currentValue)}
      options={augmentedOptions}
      target={({ ref, isOpen }) => (
        <FilterButton
          ref={ref}
          field={field}
          isRemovable={isRemovable}
          isSelected={isOpen}
          onRemove={onRemove}
          value={currentValue}
        >
          {field.formatFilter({ value: currentValue })}
        </FilterButton>
      )}
      {...props}
    />
  );
};

export default SelectView;
