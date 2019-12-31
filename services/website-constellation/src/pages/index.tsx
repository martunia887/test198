import React from 'react';
import { Router, Link } from '@reach/router';
import Brand from '../components/brand';
import PrivateRoute from '../components/PrivateRoute';
import Layout from '@atlaskit/gatsby-theme-brisk/src/components/layout';

export default () => {
  return (
    <Layout>
      <h1>Constellation</h1>
      <h2>This is the constellation homepage </h2>
    </Layout>
  );
};
