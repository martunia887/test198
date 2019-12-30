import { graphql } from 'gatsby';
import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const ComponentContent = props => {
  // if node is in index/ it is a tab
  // if node is in docsFolder it is a subpage
  let tabs = [];
  let subpages = [];

  props.mdxNodes.forEach(({ node }) => {
    if (node.parent.dir.indexOf('index') !== -1) {
      tabs.push(node);
    } else {
      subpages.push(node);
    }
  });

  return (
    <>
      {tabs &&
        tabs.map(mdx => <MDXRenderer key={mdx.id}>{mdx.body}</MDXRenderer>)}
    </>
  );
};

export default ComponentContent;
