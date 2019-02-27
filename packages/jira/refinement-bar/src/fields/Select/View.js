// @flow
/** @jsx jsx */

import { jsx } from '@emotion/core';
import { CheckboxOption, PopupSelect } from '@atlaskit/select';
import { colors } from '@atlaskit/theme';

import { FilterButton } from '../../components/FilterButton';

// TODO: there's probably a better way to do this, but it's late, and i'm tired.
export const CLEAR_DATA = {
  value: '__clear-selected',
  label: 'Clear selected items',
};

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
  props.data === CLEAR_DATA ? (
    <ClearOption {...props} />
  ) : (
    <CheckboxOption {...props} />
  );

const lcase = str => str.toLowerCase();
const trim = str => str.replace(/^\s+|\s+$/g, '');
const stringify = option => `${option.label} ${option.value}`;

// NOTE: determine which options should be visible to the user
// - reimplements react-select's input matching
// - checks (and hides) if the option already exists "above the fold"
const filterOptions = storedValue => (option, rawInput) => {
  const { data, value } = option;
  const notCurrentlySelected =
    !storedValue || !storedValue.some(o => o.value === value);

  if (rawInput) {
    const input = lcase(trim(rawInput));
    const candidate = lcase(trim(stringify(option)));
    const isMatch = candidate.includes(input);

    return isMatch && !data.aboveTheFold;
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
    .concat([CLEAR_DATA])
    .concat(resolved);
};

const SelectView = ({
  storedValue,
  refinementBarValue,
  applyChanges,
  field,
  isRemovable,
  onChange,
  onRemove,
  ...props
}: *) => {
  if (!field.options) {
    throw new Error('Select type requires options.');
  }
  if (!field.label) {
    throw new Error('Select type requires a label.');
  }

  let closeMenuOnSelect = false;

  // NOTE: supports options array to be the result of a function.
  // - pass the "current values" to the function
  let resolvedOptions = field.options;
  if (typeof field.options === 'function') {
    resolvedOptions = field.options(refinementBarValue);
  }

  // build this monstrosity of options
  const augmentedOptions = getOptions(storedValue, resolvedOptions);

  // support clearing
  const onChangeWithClearHandler = value => {
    if (value && Array.isArray(value) && value.includes(CLEAR_DATA)) {
      onChange([]);
      closeMenuOnSelect = true;
    } else {
      onChange(value);
    }
  };

  return (
    <PopupSelect
      components={{ IndicatorSeparator: null, Option }}
      isMulti
      onMenuClose={applyChanges}
      closeMenuOnSelect={closeMenuOnSelect}
      hideSelectedOptions={false}
      filterOption={filterOptions(storedValue)}
      options={augmentedOptions}
      onChange={onChangeWithClearHandler}
      target={({ ref, isOpen }) => (
        <FilterButton
          ref={ref}
          field={field}
          isRemovable={isRemovable}
          isSelected={isOpen}
          onRemove={onRemove}
          value={storedValue}
        >
          {field.formatFilter({ value: storedValue })}
        </FilterButton>
      )}
      {...props}
    />
  );
};

export default SelectView;
