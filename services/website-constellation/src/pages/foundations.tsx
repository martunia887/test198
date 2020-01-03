import React from 'react';
import Foundations from '../components/Foundations';
import PrivateRoute from '../components/PrivateRoute';
import Layout from '@atlaskit/gatsby-theme-brisk/src/components/layout';
export default ({ ...props }) => {
  return (
    <Layout>
      <PrivateRoute component={Foundations} {...props} />
    </Layout>
  );
};
