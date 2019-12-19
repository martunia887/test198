import React from 'react';
import { graphql } from 'gatsby';
import Layout from './../components/layout';
import PageTitle from './../components/page-title';

export default ({ data }) => {
  const { name, docsDisplayName } = data.workspaceInfo;
  return (
    <Layout>
      <PageTitle title={docsDisplayName} />
      <h1>{name}</h1>
    </Layout>
  );
};

export const query = graphql`
  query($name: String!) {
    workspaceInfo(name: { eq: $name }) {
      name
      docsDisplayName
    }
  }
`;
