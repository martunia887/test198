// @flow
/** @jsx jsx */

import { jsx } from '@emotion/core';
import { borderRadius, colors, gridSize } from '@atlaskit/theme';
import SearchIcon from '@atlaskit/icon/glyph/search';

const handleChange = onChange => ({ target: { value } }) => {
  onChange(value);
};
const handleSubmit = applyChanges => event => {
  event.preventDefault();
  applyChanges(event);
};

const SearchView = ({ applyChanges, onChange, value }: *) => (
  <Form onSubmit={handleSubmit(applyChanges)}>
    <Input onChange={handleChange(onChange)} value={value} />
    <Button type="submit">
      <SearchIcon label="Submit" />
    </Button>
  </Form>
);

// ==============================
// Styled Components
// ==============================

const Form = props => <form css={{ position: 'relative' }} {...props} />;
const Button = props => (
  <button
    css={{
      background: 0,
      border: 0,
      borderRadius: borderRadius(),
      color: colors.N400,
      cursor: 'pointer',
      height: '100%',
      padding: 0,
      width: 40,
      position: 'absolute',
      outline: 0,
      right: 0,
      transition: 'background-color 150ms',
      top: 0,

      ':focus, :hover': {
        backgroundColor: colors.N30A,
      },
      ':active': {
        background: colors.B50,
        color: colors.B400,
      },
    }}
    {...props}
  />
);
const Input = props => {
  return (
    <input
      css={{
        background: 0,
        backgroundColor: colors.N20A,
        border: 0,
        borderRadius: borderRadius(),
        color: colors.N400,
        fontSize: 'inherit',
        lineHeight: 1.3,
        padding: `${gridSize()}px ${gridSize() * 1.5}px`,
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
};

export default SearchView;
