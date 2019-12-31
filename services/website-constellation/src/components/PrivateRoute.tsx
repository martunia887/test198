import React from 'react';
import { navigate } from 'gatsby';
import Spinner from '@atlaskit/spinner';
import Login from './Login';
import { useAuth } from '../hooks';

export default function({ component: Component, location, ...rest }) {
  const { isLoggedIn, isValidating } = useAuth();
  if (isValidating) {
    return <Spinner />;
  } else if (!isLoggedIn && !isValidating) {
    return <Login location={location} />;
  } else {
    return <Component />;
  }
}
