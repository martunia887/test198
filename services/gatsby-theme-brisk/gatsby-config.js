// @flow
const fs = require('fs-extra');
const path = require('path');

module.exports = ({ packages, docsFolder = 'constellation' }) => {
  return {
    plugins: [
      `gatsby-plugin-typescript`,
      `gatsby-plugin-emotion`,
      `gatsby-plugin-react-helmet`,
      {
        resolve: `gatsby-plugin-mdx`,
        // eslint-disable-next-line global-require
        options: {
          remarkPlugins: [require('./plugins/remark/add-raw-to-imports')],
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          // This path resolve is fragile as heck but I don't have a synchronous getWorkspaceRoot function
          // to be called here so here we go!
          path: path.resolve(__dirname, '..', '..'),
          // This syntax matches all FILES that are not .mdx, but does not match on folders
          // If it matches on folders, this plugin does not run successfully
          ignore: [
            '**/website/**/*',
            '**/prepush',
            '**/*/LICENSE',
            '**/*/Dockerfile',
            '**/*.!(mdx)',
          ],
        },
      },
      {
        resolve: '@manypkg/gatsby-source-workspace',
        options: {
          workspaceFilter: ws => packages.includes(ws.name),
          /*
            BC - I have defined the extra fields here that we think will be useful. This should not
            be considered a canon list of etra fields and we should be happy to both add, remove or modify
            these as the data actually demands.
          */
          extraFields: [
            {
              name: 'maintainers',
              definition: `[String]`,
            },
            {
              name: 'docsDisplayName',
              definition: `String`,
              getFieldInfo: async ws =>
                ws.packageJSON.docsDisplayName ||
                ws.packageJSON.name.replace('@atlaskit/', ''),
            },
            {
              name: 'description',
              definition: `String`,
            },
            {
              name: 'docsList',
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
              name: 'examplesList',
              definition: `[String]`,
              getFieldInfo: async ws => {
                const examplesPath = path.join(ws.dir, 'examples');
                if (!(await fs.pathExists(examplesPath))) {
                  return [];
                }

                const examples = await fs.readdir(examplesPath);
                return examples;
              },
            },
            {
              name: 'rawChangelog',
              definition: `String`,
              getFieldInfo: async ws => {
                const changelogPath = path.join(ws.dir, 'CHANGELOG.md');
                if (!(await fs.pathExists(changelogPath))) {
                  return '';
                }

                return fs.readFile(changelogPath, 'utf-8');
              },
            },
          ],
        },
      },
    ],
  };
};
