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
