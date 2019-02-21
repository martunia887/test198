// @flow
/** @jsx jsx */

import { jsx } from '@emotion/core';

import styled from 'styled-components';
import { colors } from '@atlaskit/theme';

const Form = props => (
  <form
    css={{
      '&:first-of-type': {
        marginTop: 0,
      },
    }}
    {...props}
  />
);
const Label = ({ htmlFor, ...props }: *) => (
  <label
    htmlFor={htmlFor} // because linter...
    css={{
      alignItems: 'center',
      display: 'flex',
      marginBottom: 8,
      marginTop: 8,

      span: {
        marginLeft: 4,
      },
    }}
    {...props}
  />
);

const HiddenSubmitButton = props => (
  <button
    css={{
      background: 0,
      backgroundClip: '-1px -1px -1px -1px',
      border: 0,
      height: 1,
      opacity: 0,
      padding: 0,
      position: 'absolute',
      width: 1,
    }}
    {...props}
  />
);

export const Group = ({ children, ...props }: *) => (
  <Form {...props}>
    {children}
    <HiddenSubmitButton type="submit" tabIndex="-1" />
  </Form>
);

let controlId = 0;

export const Radio = ({ children, ...props }: *) => {
  const id = `refinement-bar-dialog-radio-${++controlId}`;

  return (
    <Label htmlFor={id}>
      <input type="radio" id={id} {...props} />
      <span>{children}</span>
    </Label>
  );
};

export const Note = styled.div({
  color: colors.N200,
  fontSize: '0.75rem',
  marginTop: '0.5em',
});
