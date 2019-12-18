import { graphql } from 'gatsby';
import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/layout';
import ComponentSideNav from '../components/component-side-nav';

export default function PageTemplate({
  data: { devContent, designContent, examplesContent },
}) {
  return (
    <Layout SideNavContents={ComponentSideNav}>
      <MDXRenderer>{devContent.body}</MDXRenderer>
      <MDXRenderer>{designContent.body}</MDXRenderer>
      <MDXRenderer>{examplesContent.body}</MDXRenderer>
    </Layout>
  );
}

export const query = graphql`
  query GetStuff(
    $devContent: String
    $designContent: String
    $examplesContent: String
  ) {
    devContent: mdx(id: { eq: $devContent }) {
      body
    }
    designContent: mdx(id: { eq: $designContent }) {
      body
    }
    examplesContent: mdx(id: { eq: $examplesContent }) {
      body
    }
  }
`;
