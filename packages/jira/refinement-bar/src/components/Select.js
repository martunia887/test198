// @flow
/** @jsx jsx */

import React, { type Node } from 'react';
import { jsx } from '@emotion/core';
import Select, { CheckboxOption } from '@atlaskit/select';
import SearchIcon from '@atlaskit/icon/glyph/editor/search';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import { colors, gridSize } from '@atlaskit/theme';
import Spinner from '@atlaskit/spinner';

// NOTE: This option data is used for quick and dirty referential equality
// checks throughout the refinment bar filters, it must be imported where
// applicable. You can use the `isClearOption` function below for string
// equality.
export const SELECT_CLEAR_OPTION = {
  label: 'Clear selected items',
  value: '__CLEAR_SELECTED__',
};
export function isClearOption(opt: Object) {
  return opt.value === SELECT_CLEAR_OPTION.value;
}

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
    <QuestionCircleIcon primaryColor={colors.N100} size="xlarge" />
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

const ClearOption = ({ children, innerProps, isFocused }: *) => (
  <div
    css={{
      boxSizing: 'border-box',
      color: colors.primary(),
      cursor: 'pointer',
      fontSize: 'inherit',
      padding: '8px 12px',
      textDecoration: isFocused ? 'underline' : null,
      userSelect: 'none',
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
// $FlowFixMe "memo" type not supported yet
const Option = React.memo((props: Object) =>
  props.data === SELECT_CLEAR_OPTION ? (
    <ClearOption {...props} />
  ) : (
    <CheckboxOption css={{ paddingLeft: `8px !important` }} {...props} />
  ),
);

export const selectComponents = {
  Control,
  DropdownIndicator,
  IndicatorSeparator: null,
  LoadingIndicator: null,
  Menu,
  Option,
};

type State = {
  inputValue: string,
};

export class BaseSelect extends React.Component<*, State> {
  state = { inputValue: this.props.inputValue || '' };

  selectRef = React.createRef();

  componentDidMount() {
    if (this.selectRef.current) {
      this.selectRef.current.select.openMenu('first');
    }
  }

  componentDidUpdate(p: *, s: State) {
    const diffInput = s.inputValue !== this.state.inputValue;
    const diffLoading = p.isLoading !== this.props.isLoading;
    const diffValue = p.value !== this.props.value;

    // call the `scheduleUpdate` function provided by "react-popper" when
    // there's potential for the dialog to shift position
    if (
      (diffInput || diffLoading || diffValue) &&
      typeof this.props.scheduleUpdate === 'function'
    ) {
      this.props.scheduleUpdate();
    }
  }

  handleInputChange = (inputValue: string, meta: Object) => {
    if (this.props.onInputChange) {
      this.props.onInputChange(inputValue, meta);
    }

    this.setState({ inputValue });
  };

  render() {
    return (
      <Select
        innerRef={this.selectRef}
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
        {...this.props}
        onInputChange={this.handleInputChange}
      />
    );
  }
}
