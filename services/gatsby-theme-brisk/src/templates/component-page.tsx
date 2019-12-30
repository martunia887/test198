import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PageTitle from '../components/page-title';
import ComponentContent from '../content/component-content';

export default ({ data }) => {
  console.log(data);
  const { name, docsDisplayName } = data.workspaceInfo;
  return (
    <Layout>
      <PageTitle title={docsDisplayName} />
      <h1>{name}</h1>
      {/* <ComponentContent mdxNodes={data.allMdx.edges} /> */}
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
      edges {
        node {
          parent {
            ... on File {
              absolutePath
              name
              dir
            }
          }
          id
          body
        }
      }
    }
  }
`;
