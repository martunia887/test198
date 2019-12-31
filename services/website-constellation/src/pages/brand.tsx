import React from 'react';
import Brand from '../components/Brand';
import PrivateRoute from '../components/PrivateRoute';
import Layout from '../components/Layout';
export default ({ ...props }) => {
  return (
    <Layout>
      <PrivateRoute component={Brand} {...props} />
    </Layout>
  );
};
