import React from 'react';
import { graphql } from 'gatsby';
import Layout from './../components/layout';
import PageTitle from './../components/page-title';

export default ({ data }) => {
  console.log(data);
  const { name, docsDisplayName } = data.workspaceInfo;
  const mdxNodes = data.allMdx;
  // if we have subpages, render those
  // if we have tabs, render those
  return (
    <Layout>
      <PageTitle title={docsDisplayName} />
      <h1>{name}</h1>
    </Layout>
  );
};

export const query = graphql`
  query($name: String!, $mdxPath: String) {
    workspaceInfo(name: { eq: $name }) {
      name
      docsDisplayName
    }
    allMdx(filter: { fileAbsolutePath: { glob: $mdxPath } }) {
      nodes {
        id
        fileAbsolutePath
        parent {
          ... on File {
            absolutePath
            name
          }
        }
      }
    }
  }
`;
