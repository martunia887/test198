import { graphql } from 'gatsby';
import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const ComponentContent = ({ mdxNodes }) => {
  return (
    <>
      {mdxNodes &&
        mdxNodes.map(mdx => <MDXRenderer key={mdx.id}>{mdx.body}</MDXRenderer>)}
    </>
  );
};

export default ComponentContent;
