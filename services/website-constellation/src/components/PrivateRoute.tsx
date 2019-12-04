import React from 'react';
import { navigate } from 'gatsby';
import Spinner from '@atlaskit/spinner';
import { useAuth } from '../hooks';

export default function({ component: Component, location, ...rest }) {
  const { isLoggedIn, isValidating } = useAuth();
  if (isValidating) {
    return <Spinner />;
  } else if (
    !isLoggedIn &&
    !isValidating &&
    location.pathname !== '/contentful/login'
  ) {
    navigate('/contentful/login');
    return null;
  } else {
    return <Component />;
  }
}
