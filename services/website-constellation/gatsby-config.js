// @flow
const fs = require('fs-extra');
const path = require('path');

const constellationInitialPackages = [
  '@atlaskit/radio',
  '@atlaskit/button',
  '@atlaskit/select',
];

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

module.exports = {
  plugins: [
    {
      resolve: '@manypkg/gatsby-source-workspace',
      options: {
        workspaceFilter: ws => constellationInitialPackages.includes(ws.name),
        extraFields: [
          {
            name: 'maintainers',
            definition: `[String]`,
          },
          {
            name: 'docsPages',
            definition: `[String]`,
            getFieldInfo: async ws => {
              const docsPath = path.join(ws.dir, 'docs');
              if (!(await fs.pathExists(docsPath))) {
                return [];
              }

              const docs = await fs.readdir(docsPath);
              return docs;
            },
          },
          {
            name: 'changelogEntries',
            definition: `[ChangelogEntry]`,
            getFieldInfo: async ws => {
              const changelogPath = path.join(ws.dir, 'CHANGELOG.md');
              if (!(await fs.pathExists(changelogPath))) {
                return '';
              }

              const changelog = await fs.readFile(changelogPath, 'utf-8');

              const a = divideChangelog(changelog);
              return a;
            },
          },
        ],
      },
    },
    {
      resolve: require.resolve('@brisk-docs/gatsby-plugin'),
    },
  ],
};

// paths to all docs files
// paths to all examples files
// the parsed changelog
