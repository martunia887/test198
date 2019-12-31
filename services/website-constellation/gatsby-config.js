// @flow
const path = require('path');
const constellationInitialPackages = require('./constellation-package-list');

module.exports = {
  siteMetadata: {
    siteName: `Constellation`,
    siteUrl: `https://atlassian.design`,
    description: `Help us lol`,
  },
  plugins: [
    {
      resolve: `@atlaskit/gatsby-theme-brisk`,
      options: {
        packages: constellationInitialPackages,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: { remarkPlugins: [require('./some-plugin-pls-tidy')] },
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
  ],
};
