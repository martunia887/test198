import { graphql } from 'gatsby';
import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const ComponentContent = props => {
  return <MDXRenderer>{props.mdx}</MDXRenderer>;
};

export default ComponentContent;
