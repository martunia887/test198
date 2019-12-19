// @flow

const { createContentDigest } = require('gatsby-core-utils');

// BC - I have written this function in a bunch of places and it really needs to be a lib
// sorry for copy-pasting it here again
const divideChangelog = changelog => {
  const splitToken = `__CHANGELOG_SPLIT_${Date.now()}__`;
  return changelog
    .replace(/[\n\r\s]## /g, `${splitToken}## `)
    .split(splitToken)
    .reduce((all, md) => {
      // This should only allow us to skip the first chunk which is the name, as
      // well as the unreleased section.
      const match = md.match(/\d+\.\d+\.\d+/);

      const version = match ? match[0] : null;
      if (!version) return all;
      return all.concat({
        version,
        md,
      });
    }, []);
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // This is being used by the config of @manypkg/gatsby-source-workspace to implement ChangelogEntry chunks
  // This should likely be changed alongside that.
  const typeDefs = `
  type ChangelogEntry implements Node {
    version: String
    packageName: String
    md: String
  }
  `;

  createTypes(typeDefs);
};

exports.onCreateNode = async ({ node, actions }) => {
  const { createNode } = actions;

  if (node.internal.type === 'workspaceInfo') {
    const changelogBits = divideChangelog(node.rawChangelog);
    for (const bit of changelogBits) {
      const name = `${node.name}__${bit.version}`;

      createNode({
        id: name,
        packageName: node.name,
        ...bit,
        internal: {
          contentDigest: createContentDigest({
            name,
          }),
          type: 'changelogEntry',
        },
      });
    }
  }
};

// to do: define docsfolder deafult
exports.createPages = async function({ actions, graphql }, options) {
  let context = {};
  const docsFolder = options.docsFolder || 'constellation';
  const { data } = await graphql(`
    query {
      allWorkspaceInfo {
        edges {
          node {
            name
            docsDisplayName
            dir
          }
        }
      }
    }
  `);

  data.allWorkspaceInfo.edges.forEach(edge => {
    const slug = edge.node.docsDisplayName;
    const name = edge.node.name;
    const mdxPath = `${edge.node.dir}/${options.docsFolder}/**`;

    actions.createPage({
      path: `components/${slug}`,
      component: require.resolve(`./src/templates/component.tsx`),
      context: { name: name, mdxPath: mdxPath },
    });
  });
};
