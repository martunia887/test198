// @flow
/** @jsx jsx */

// $FlowFixMe "there is no `forwardRef` export in `react`"
import { createRef, forwardRef, PureComponent } from 'react';
import { jsx } from '@emotion/core';
import { borderRadius, colors, gridSize } from '@atlaskit/theme';
import SearchIcon from '@atlaskit/icon/glyph/search';

import { ClearButton, HiddenSubmitButton } from '../../components/common';

export default class SearchView extends PureComponent<*> {
  inputRef = createRef();
  handleChange = (event: Event) => {
    // $FlowFixMe "property `value` is missing in `EventTarget`"
    this.props.onChange(event.target.value);
  };
  handleClear = () => {
    this.props.onChange('');
    const el = this.inputRef.current;

    if (el && typeof el.focus === 'function') {
      el.focus();
    }
  };
  handleSubmit = (event: Event) => {
    event.preventDefault();
  };
  render() {
    const { value } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input ref={this.inputRef} onChange={this.handleChange} value={value} />

        {value ? (
          <ClearButton onClick={this.handleClear} label="Clear search" />
        ) : (
          <SearchIndicator />
        )}

        <HiddenSubmitButton tabIndex="-1" type="submit">
          Submit
        </HiddenSubmitButton>
      </Form>
    );
  }
}

// ==============================
// Styled Components
// ==============================

const Form = (props: *) => <form css={{ position: 'relative' }} {...props} />;
const SearchIndicator = (props: *) => (
  <div
    css={{
      background: 0,
      border: 0,
      borderRadius: borderRadius(),
      color: colors.N400,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // cursor: 'pointer',
      height: '100%',
      padding: 0,
      width: 40,
      position: 'absolute',
      outline: 0,
      right: 0,
      transition: 'background-color 150ms',
      top: 0,
    }}
    {...props}
  >
    <SearchIcon label="Submit" />
  </div>
);
const Input = forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      css={{
        background: 0,
        backgroundColor: colors.N20A,
        border: 0,
        borderRadius: borderRadius(),
        color: colors.N400,
        fontSize: 'inherit',
        lineHeight: 1.3,
        padding: `${gridSize()}px ${gridSize() * 1.5}px`,
        paddingRight: 40,
        outline: 0,
        transition: 'background-color 150ms',

        ':hover': {
          backgroundColor: colors.N30A,
        },
        ':focus, :active': {
          backgroundColor: colors.N40A,
        },
      }}
      {...props}
    />
  );
});
