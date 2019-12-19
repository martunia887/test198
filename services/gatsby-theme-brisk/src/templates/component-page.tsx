import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PageTitle from '../components/page-title';
import ComponentContent from '../content/component-content';

export default ({ data }) => {
  const { name, docsDisplayName } = data.workspaceInfo;
  const mdxNodes = data.allMdx.edges;
  // if node is in index/ it is a tab
  // if node is in docsFolder it is a subpage
  let tabs = [];
  let subpages = [];
  mdxNodes.forEach(({ node }) => {
    if (node.parent.dir.indexOf('index') !== -1) {
      console.log('tab');
      tabs.push(node.body);
    } else {
      console.log('subpage');
      subpages.push(node.body);
    }
  });
  return (
    <Layout>
      <PageTitle title={docsDisplayName} />
      <h1>{name}</h1>
      {tabs && tabs.map(mdx => <ComponentContent mdx={mdx} />)}
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
          body
        }
      }
    }
  }
`;
