// @flow
/** @jsx jsx */

import React, { forwardRef, type Node } from 'react';
import { jsx } from '@emotion/core';
import Select, { CheckboxOption } from '@atlaskit/select';
import SearchIcon from '@atlaskit/icon/glyph/editor/search';
import { colors, gridSize } from '@atlaskit/theme';
import Spinner from '@atlaskit/spinner';

import noResultsIcon from '../assets/no-results-icon.png';

// ==============================
// React-Select Replacements
// ==============================

const DropdownIndicator = () => (
  <div css={{ marginRight: 2, textAlign: 'center', width: 32 }}>
    <SearchIcon />
  </div>
);
const Menu = ({ innerRef, innerProps, children }: *) => (
  <div ref={innerRef} {...innerProps}>
    {children}
  </div>
);
const Control = ({ children, innerProps, innerRef }: *) => (
  <div
    ref={innerRef}
    css={{
      boxShadow: `0 2px 0 ${colors.N30A}`,
      display: 'flex',
      padding: 4,
    }}
    {...innerProps}
  >
    {children}
  </div>
);

// ==============================
// Prop-based
// ==============================

type BoxProps = { children: Node, height: number };
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

Box.defaultProps = { height: 140 };
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
const noOptionsMessage = () => (
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
const loadingMessage = () => (
  <Box>
    <Box height={75}>
      <Spinner size="large" />
    </Box>
    <Text>Loading...</Text>
  </Box>
);

// ==============================
// Exports
// ==============================

export const selectComponents = {
  Control,
  DropdownIndicator,
  IndicatorSeparator: null,
  LoadingIndicator: null,
  Menu,
  Option: CheckboxOption,
};
// export const BaseSelect = forwardRef((props, ref) => (
//   <Select
//     backspaceRemovesValue={false}
//     closeMenuOnSelect={false}
//     controlShouldRenderValue={false}
//     hideSelectedOptions={false}
//     isClearable={false}
//     isMulti
//     menuIsOpen
//     menuShouldScrollIntoView={false}
//     ref={ref}
//     tabSelectsValue={false}
//     noOptionsMessage={noOptionsMessage}
//     loadingMessage={loadingMessage}
//     {...props}
//   />
// ));

export class BaseSelect extends React.Component {
  state = { inputValue: '' };
  onInputChange = inputValue => {
    this.setState({ inputValue });
  };
  componentDidUpdate(p, s) {
    const newValue = this.props.inputValue || this.state.inputValue;
    const oldValue = p.inputValue || s.inputValue;

    if (oldValue !== newValue && this.props.scheduleUpdate) {
      this.props.scheduleUpdate();
    }
  }
  render() {
    const onInputChange = this.props.onInputChange || this.onInputChange;

    return (
      <Select
        backspaceRemovesValue={false}
        closeMenuOnSelect={false}
        controlShouldRenderValue={false}
        hideSelectedOptions={false}
        isClearable={false}
        isMulti
        menuIsOpen
        menuShouldScrollIntoView={false}
        tabSelectsValue={false}
        noOptionsMessage={noOptionsMessage}
        loadingMessage={loadingMessage}
        onInputChange={onInputChange}
        inputValue={this.props.inputValue}
        {...this.props}
      />
    );
  }
}
