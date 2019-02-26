// @flow
/** @jsx jsx */

import { type Node } from 'react';
import { jsx } from '@emotion/core';
import { CheckboxOption, PopupSelect, makeAsyncSelect } from '@atlaskit/select';
import Spinner from '@atlaskit/spinner';
import { colors, gridSize } from '@atlaskit/theme';

import { FilterButton } from '../../components/FilterButton';
import noResultsIcon from '../../assets/no-results-icon.png';

const AsyncPopupSelect = makeAsyncSelect(PopupSelect);

const AsyncSelectView = ({
  currentValue,
  currentValues,
  applyChanges,
  field,
  isRemovable,
  onRemove,
  loadOptions,
  ...props
}: *) => {
  // NOTE: once at least one option is selected show the value by default
  // it's a bit hacky, but works well. there may be a better solution
  const visibleOptions =
    props.value && props.value.length ? props.value : field.defaultOptions;

  return (
    <AsyncPopupSelect
      components={{
        IndicatorSeparator: null,
        LoadingIndicator: null,
        Option: CheckboxOption,
      }}
      isMulti
      searchThreshold={-1}
      defaultOptions={visibleOptions}
      loadOptions={field.loadOptions}
      noOptionsMessage={() => <NoMatch />}
      loadingMessage={() => <Loading />}
      onMenuClose={applyChanges}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
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

// Styled Components
type BoxProps = {
  children: Node,
  height: number,
};
const Box = ({ height, ...props }: BoxProps) => (
  <div
    css={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      height,
      justifyContent: 'center',
    }}
    {...props}
  />
);

Box.defaultProps = {
  height: 140,
};
const Text = (props: *) => (
  <div
    css={{
      fontWeight: 500,
      fontSize: '0.85rem',
      color: colors.N100,
      marginTop: gridSize() * 2,
    }}
    {...props}
  />
);
const NoMatch = () => (
  <Box>
    <img
      alt="magnifying glass with question marks"
      height="75"
      src={noResultsIcon}
      width="82"
    />
    <Text>No matches found</Text>
  </Box>
);
const Loading = () => (
  <Box>
    <Box height={75}>
      <Spinner size="large" />
    </Box>
    <Text>Loading...</Text>
  </Box>
);

export default AsyncSelectView;
