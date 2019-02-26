// @flow
/** @jsx jsx */

// $FlowFixMe
import { forwardRef } from 'react';
import { jsx } from '@emotion/core';
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import SearchIcon from '@atlaskit/icon/glyph/search';

const ButtonWrapper = props => (
  <div css={{ position: 'absolute', right: 2, top: 2 }} {...props} />
);
const Form = props => <form css={{ position: 'relative' }} {...props} />;

const handleChange = onChange => ({ target: { value } }) => {
  onChange(value);
};
const handleSubmit = applyChanges => event => {
  event.preventDefault();
  applyChanges(event);
};

const SearchView = forwardRef(({ applyChanges, onChange, value }, ref) => (
  <Form onSubmit={handleSubmit(applyChanges)}>
    <Textfield onChange={handleChange(onChange)} ref={ref} value={value} />
    <ButtonWrapper>
      <Button
        appearance="subtle-link"
        iconBefore={<SearchIcon label="Submit" />}
        type="submit"
      />
    </ButtonWrapper>
  </Form>
));

export default SearchView;
