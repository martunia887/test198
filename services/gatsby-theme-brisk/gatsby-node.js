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

async function getMdx({ name, packageName, mdxPath }, { actions, graphql }) {
  // get all Mdx for the package
  const globPath = `${mdxPath}/**`;

  const { data } = await graphql(`
    query {
      allMdx(filter: {fileAbsolutePath: {glob: "${globPath}"}}) {
        edges {
          node {
            parent {
               ... on File {
                absolutePath
                name
                dir
              }
            }
          }
        }
      }
    }
  `);

  let hasTabs = false;
  let hasSubFolders = false;

  // for each mdx node
  if (data.allMdx.edges.length > 0) {
    data.allMdx.edges.forEach(({ node }) => {
      const { name: nodeName, dir } = node.parent;

      // check if it is a tab
      if (dir.indexOf('index') !== -1) {
        hasTabs = true;
      }

      // check if it's inside of a subfolder
      if (dir !== mdxPath) {
        hasSubFolders = true;
      }

      // check if it is a subpage (top-level pages other than index)
      if (dir === mdxPath && nodeName !== 'index') {
        // create the page
        actions.createPage({
          path: `components/${name}/${nodeName}`,
          component: require.resolve(`./src/templates/component-page.tsx`),
          context: { name: packageName, mdxPath: `${mdxPath}/${nodeName}.mdx` },
        });
      }
    });
  }
  // TODO: if there's subFolders, recurse

  if (hasTabs) {
    // if there's tabs, load mdx for each
    actions.createPage({
      path: `components/${name}`,
      component: require.resolve(`./src/templates/component-page.tsx`),
      context: { name: packageName, mdxPath: `${mdxPath}/index/*` },
    });
  } else {
    // else, only load the index
    actions.createPage({
      path: `components/${name}`,
      component: require.resolve(`./src/templates/component-page.tsx`),
      context: { name: packageName, mdxPath: `${mdxPath}/index.mdx` },
    });
  }
}

exports.createPages = async function({ actions, graphql }, { docsFolder }) {
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
    const name = edge.node.docsDisplayName;
    const packageName = edge.node.name;
    const mdxPath = `${edge.node.dir}/${docsFolder}`;

    const info = {
      mdxPath,
      name,
      packageName,
    };

    getMdx(info, { actions, graphql });
  });
};
