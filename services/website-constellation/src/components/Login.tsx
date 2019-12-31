import React from 'react';
import Button from '@atlaskit/button';
export default function Login({ location }) {
  return (
    <Button
      href={`/.netlify/functions/auth/google?redirect=${location.pathname}`}
    >
      Login
    </Button>
  );
}
