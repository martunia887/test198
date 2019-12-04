import React from 'react';
import { Router } from '@reach/router';
import Spinner from '@atlaskit/spinner';
import PrivateRoute from '../components/PrivateRoute';
import Login from '../components/Login';
import ProtectedContentfulPage from '../components/ProtectedContentfulPage';
import { useAuth, useData } from '../hooks';
import { constellationUrl } from '../constants';

function Status() {
  const { isLoggedIn, isValidating } = useAuth();
  const {
    data: { displayName, photos },
    error,
  } = useData(`/.netlify/functions/auth/user`);
  if (isValidating) {
    return (
      <div>
        <Spinner size="small" />
      </div>
    );
  }
  return (
    <div>
      {!isLoggedIn && !isValidating ? (
        <p>
          {'you are not logged in'}{' '}
          <a href={`/.netlify/functions/auth/google`}>{'log in'}</a>
        </p>
      ) : (
        `you are logged in ${displayName}`
      )}
    </div>
  );
}

export default () => {
  return (
    <div>
      <Status />
      <Router>
        <Login path="/contentful/login" />
        <PrivateRoute
          path="/contentful/data"
          component={ProtectedContentfulPage}
        />
      </Router>
    </div>
  );
};
