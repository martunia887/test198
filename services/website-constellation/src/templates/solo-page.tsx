import { graphql } from 'gatsby';
import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/layout';
import ComponentSideNav from '../components/component-side-nav';

export default function PageTemplate({ data: { mdx } }) {
  return (
    <Layout SideNavContents={ComponentSideNav}>
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </Layout>
  );
}
export const query = graphql`
  query MdXSinglePage($id: String) {
    mdx(id: { eq: $id }) {
      body
    }
  }
`;
